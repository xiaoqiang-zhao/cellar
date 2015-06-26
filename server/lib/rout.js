/**
 * 路由请求
 *
 * Created by v_zhaoxiaoqiang on 2015/6/1.
 */

var fs = require('fs');
var url = require('url');
var config = require('./config');

/****  路径处理  ***/
// 两层向上表示当前文件距项目根路径的深度是二
config.requireServicePath = '../..' + config.servicePath; // 写死了，如果修改server的目录结构此处会有坑
// 去开头 (文件路径需要将windows系统下的左“\”成"/")
var filePathRoot = __dirname.replace(process.cwd(), '').replace(/\\/g, '/');
// 去结尾
filePathRoot = filePathRoot.replace(/\/server\/lib$/, '');
// 加相对路径，去头之后是以斜杠开头的
filePathRoot = '.' + filePathRoot;
config.filePathRoot = filePathRoot;

/**
 * 通过扩展名获取文件的配置信息
 *
 * @param {string} ext 文件扩展名
 * @return {Object} configData 文件的配置信息，未找到匹配项返回undefined
 * @private
 */
function getStaticFieldConfig(ext) {
    var configData;
    if (typeof ext === 'string' && ext.length > 0) {
        // 对带点的做个容错
        if (ext.charAt(0) === '.') {
            ext = ext.slice(1);
        }
        // 转换为小写
        ext = ext.toLowerCase();
        configData = config.staticFieldConfig[ext];
    }

    return configData;
}

/**
 * 路由请求
 *
 * @param {Object} request HTTP请求对象
 * @param {Object} response HTTP返回对象
 * @public
 */
function routRequest(request, response) {
    // 路由队列（路由的优先顺序在此配置）
    var routList = [
        routStaticFile,
        routUserSettingPath,
        routAutoPath,
        notFound
    ];

    var rout = {
        next: function () {
            if (routList.length > 0) {
                routList.shift()(request, response, rout);
            }
        },
        last: function () {
            // 拼接额外的参数
            var arg = [request, response].concat([].slice.call(arguments));
            routList.pop().apply(null, arg);
        }
    };

    rout.next();
}

/**
 * 路由静态文件请求
 *
 * @param {Object} request HTTP请求对象
 * @param {Object} response HTTP返回对象
 * @param {Object} rout 路由对象，包含next和last两个方法来提供路由队列的操作
 * @private
 */
function routStaticFile(request, response, rout) {
    // TODO 错误日志，异常处理
    // 请求路径
    var path = url.parse(request.url).pathname;

    // 取得后缀名
    var ext = path.match(/(\.[^.]+|)$/)[0];
    var staticFieldConfig = getStaticFieldConfig(ext);

    // 允许访问此扩展名的静态文件
    if (staticFieldConfig !== undefined) {
        // 读取静态文件
        fs.readFile(filePathRoot + path, staticFieldConfig.encoding, function (err, data) {
            if (err) {
                rout.last({
                    type: 'file',
                    data: staticFieldConfig,
                    msg: '未找到文件，或文件读取失败'
                });
            }
            else {
                response.writeHead(200, {
                    'Content-Type': staticFieldConfig.contentType
                });
                response.write(data, staticFieldConfig.encoding);
                response.end();
            }
        });
    }
    // 不允许访问此扩展名的静态文件
    else {
        rout.next();
    }
}

/**
 * 路由用户配置的路径，RESTful依靠此实现
 *
 * @param {Object} request HTTP请求对象
 * @param {Object} response HTTP返回对象
 * @param {Object} rout 路由对象，包含next和last两个方法来提供路由队列的操作
 * @private
 */
function routUserSettingPath(request, response, rout) {
    var serviceRoutConfig;
    var routInfo;
    var requireServicePath = config.requireServicePath;
    try {
        serviceRoutConfig = require(requireServicePath + config.serviceRoutConfigPath);
        routInfo = getRoutInfo(request, serviceRoutConfig);
    }
    catch (err) {
        // 获取用户配置的路由失败，进入下一个分支
        rout.next();
    }

    if (routInfo !== null) {
        try {
            var contentType = getStaticFieldConfig(routInfo.contentType);
            var serviceModel = require(requireServicePath + routInfo.modelPath);
            // 服务调用方法名
            var methodName = routInfo.methodName || config.serviceDefaultMethodName;

            /**
             * 方案一，使用方便，但是会污染服务对象
             *
             // 为 serviceModel 添加额外的属性，
             // 如果 serviceModel 中已经有这两个属性，那么会被覆盖，这个还没有好的解决办法
             serviceModel.request = request;
             serviceModel.response = response;
             // 将分离出的路径参数传入
             var content = serviceModel[routInfo.method].apply(serviceModel, routInfo.arguments);
             */

            /**
             * 方案二，不污染服务对象，在服务对象的对外方法中需要显示声明参数
             */
            routInfo.arguments.push(request, response);
            var content = serviceModel[methodName].apply(serviceModel, routInfo.arguments);
            if(typeof content === 'object') {
                content = JSON.stringify(content);
            }

            response.writeHead(200, {
                'Content-Type': contentType
            });
            response.write(content);
        }
        catch (err) {
            response.writeHead(500);
        }
        response.end();
    }
    else {
        rout.next();
    }

    /**
     * 获取路由配置信息
     *
     * @param {Object} request http请求对象
     * @param {Object} serviceRoutConfig 服务路由配置
     * @return {Object} result 路由配置信息，外加一个arguments的参数数组，如果找不到匹配信息返回null
     * @private
     */
    function getRoutInfo(request, serviceRoutConfig) {
        var requestMethodType = request.method.toUpperCase();
        var urlPath = url.parse(request.url).pathname;
        var requestUrlPathArr = urlPath.split('/');
        var matchArgs;
        var result = null;

        for (var i = serviceRoutConfig.length; i--;) {
            var item = serviceRoutConfig[i];
            // 请求类型符合
            if (item.requestMethodType === requestMethodType) {
                // 路径匹配（通过获取参数来变通）
                matchArgs = getMatchArgs(item.urlPath, requestUrlPathArr);

                if (matchArgs !== null) {
                    result = item;
                    result.arguments = matchArgs;
                    break;
                }
            }
        }

        return result;
    }

    /**
     * 获取匹配的路径的参数
     *
     * @param {string} configUrlPath 配置中的路径
     * @param {Array} requestUrlPathArr 请求路径的数组化参数（为了性能只需转一次就好）
     * @return {null/Array} args
     * @private
     */
    function getMatchArgs(configUrlPath, requestUrlPathArr) {
        var args = [];
        var reg = /^\{.*\}$/;
        var configUrlPathArr = configUrlPath.split('/');

        if (requestUrlPathArr.length === configUrlPathArr.length) {
            for (var i = 0, len = configUrlPathArr.length; i < len; i++) {
                // 是参数
                if (reg.test(configUrlPathArr[i])) {
                    args.push(requestUrlPathArr[i]);
                }
                // 是路径片段
                else if (requestUrlPathArr[i] !== configUrlPathArr[i]) {
                    break;
                }
            }
            // 未全部匹配
            if (i !== len) {
                args = null;
            }
        }
        else {
            args = null;
        }

        return args;
    }

}

/**
 * 根据请求路径路由服务
 *
 * @param {Object} request HTTP请求对象
 * @param {Object} response HTTP返回对象
 * @param {Object} rout 路由对象，包含next和last两个方法来提供路由队列的操作
 * @private
 */
function routAutoPath(request, response, rout) {
    var pathName = url.parse(request.url).pathname;
    var modePath = config.requireServicePath + pathName;
    var filePath = filePathRoot + config.servicePath + pathName;

    fs.exists(filePath, function (exists) {
        if (exists) {
            writeResponse(modePath);
        }
        else {
            fs.exists(filePath + '.js', function (exists) {
                if (exists) {
                    writeResponse(modePath + '.js');
                }
                else {
                    rout.next();
                }
            });
        }
    });

    function writeResponse(modePath) {
        try {

            var serviceModel = require(modePath);
            // 服务调用方法名
            var methodName = config.serviceDefaultMethodName;
            var contentType = serviceModel.contentType || serviceDefaultContentType;
            contentType = getStaticFieldConfig(contentType).contentType;

            var content = serviceModel[methodName](request, response);
            if(typeof content === 'object') {
                content = JSON.stringify(content);
            }

            response.writeHead(200, {
                'Content-Type': contentType
            });
            response.write(content);
        }
        catch (err) {
            response.writeHead(500);
        }
        response.end();
    }
}

/**
 * 未找到资源或服务的处理（404）
 *
 * @param {Object} request HTTP请求对象
 * @param {Object} response HTTP返回对象
 * @param {Object} notFoundMsg 未找到的一些信息反馈
 * @private
 */
function notFound(request, response, notFoundMsg) {
    response.writeHead(404);
    response.end();
}
module.exports = {
    routRequest: routRequest
};