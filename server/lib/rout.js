/**
 * 路由请求
 *
 * Created by v_zhaoxiaoqiang on 2015/6/1.
 */

var fs = require('fs');
var url = require('url');
var config = require('./config');
var getStaticFieldConfig = config.getStaticFieldConfig;

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
        routUserSettingPath,
        routStaticFile,
        routAutoPath,
        response404
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
    // 错误日志，异常处理
    try {
        rout.next();
    }
    catch (e) {
        console.log('静态文件路由错误:           ');
        console.log(e);
    }
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
    // 请求路径
    var path = url.parse(request.url).pathname;

    // 取得后缀名作为文件类型
    var contentType = path.match(/(\.[^.]+|)$/)[0];
    var staticFieldConfig = getStaticFieldConfig(contentType);

    // 允许访问此扩展名的静态文件
    if (staticFieldConfig !== undefined) {
        // 读取静态文件
        fs.readFile(config.webRootPath + path, staticFieldConfig.encoding, function (err, data) {
            if (err) {
                rout.last({
                    type: 'file',
                    data: staticFieldConfig,
                    msg: '未找到文件，或文件读取失败'
                });
            }
            else {
                response200(response, contentType, data, staticFieldConfig.encoding);
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
    try {
        serviceRoutConfig = require(config.serviceRootPath + config.serviceRoutConfigPath);
        routInfo = getRoutInfo(request, serviceRoutConfig);
    }
    catch (err) {
        // 获取用户配置的路由失败，进入下一个分支
        rout.next();
        return;
    }

    if (routInfo !== null) {
        if (routInfo.type === 'staticFile') {
            request.url = routInfo.filePatch;
            rout.next();
        }
        else {
            try {
                var contentType = getStaticFieldConfig(routInfo.contentType);
                var serviceModel = require(config.serviceRootPath + routInfo.modelPath);
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
                routInfo.arguments.push(
                    request,
                    response,
                    // 给服务的异步准备的，服务走异步时请勿有返回值（或返回undefined）
                    function (contentType, content, encoding) {
                        response200(response, contentType, content, encoding);
                    },
                    // 异常捕获回调
                    function () {
                        response500(response);
                    }
                );
                var content = serviceModel[methodName].apply(serviceModel, routInfo.arguments);
                response200(response, contentType, content);
            }
            catch (err) {
                response500(response);
            }
        }
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
    var modelPath = config.serviceRootPath + pathName;

    fs.exists(modelPath, function (exists) {
        if (exists) {
            writeResponse(modelPath);
        }
        else {
            fs.exists(modelPath + '.js', function (exists) {
                if (exists) {
                    writeResponse(modelPath + '.js');
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
            var contentType = serviceModel.contentType || config.serviceDefaultContentType;
            var content = serviceModel[methodName](
                request,
                response,
                // 给服务的异步准备的，服务走异步时请勿有返回值（或返回undefined）
                function (contentType, content, encoding) {
                    response200(response, contentType, content, encoding);
                },
                function () {
                    response500(response);
                }
            );
            // 同步返回
            response200(response, contentType, content);
        }
        catch (err) {
            response500(response);
        }
    }
}

/**
 * HTTP返回200，当 content 的值为 undefined 时走异步回调
 *
 * @param {Object} request HTTP请求对象
 * @param {string} contentType 返回内容类型
 * @param {Object | String} content 返回内容
 * @param {string} encoding 编码
 */
function response200(response, contentType, content, encoding) {
    try {
        var staticFieldConfig = getStaticFieldConfig(contentType);
        if (staticFieldConfig === undefined) {
            staticFieldConfig = getStaticFieldConfig(config.serviceDefaultContentType);
        }
        // 有返回值时走同步调用
        if (content !== undefined) {
            if (typeof content === 'object') {
                content = JSON.stringify(content);
            }

            response.writeHead(200, {
                'Content-Type': staticFieldConfig.contentType
            });

            encoding = encoding || config.encoding;

            response.write(content, encoding);
            response.end();
        }
        // 沒有返回值时走异步回调，在应用中调用，此处不做处理
    }
    catch (err) {
        console.log('有请求未正确响应');
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
function response404(request, response, notFoundMsg) {
    response.writeHead(404);
    response.end();
}

/**
 * HTTP返回500
 *
 * @param {Object} response HTTP返回对象
 */
function response500(response) {
    response.writeHead(500);
    response.end();
}

module.exports = {
    routRequest: routRequest
};