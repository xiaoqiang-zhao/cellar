/**
 * 路由请求
 *
 * Created by v_zhaoxiaoqiang on 2015/6/1.
 */

var fs = require('fs');
var url = require('url');
var config = require('./config');

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

    /* 异步编程的队列方案 */
    routList.shift()(request, response, routList);

    /* 异步队列不能用循环
     var result;
     routList.some(function (item) {
     try {
     result = item(request, response);
     }
     catch (err) {
     result = false;
     }
     return result;
     });
     */
}

/**
 * 路由静态文件请求
 *
 * @param {Object} request HTTP请求对象
 * @param {Object} response HTTP返回对象
 * @param {Array} routList 路由队列（不包含当前的路由规则）
 * @private
 */
function routStaticFile(request, response, routList) {
    // TODO 错误日志，异常处理
    // 请求路径
    var path = url.parse(request.url).pathname;

    // 取得后缀名
    var ext = path.match(/(\.[^.]+|)$/)[0];
    var staticFieldConfig = getStaticFieldConfig(ext);

    // 允许访问此扩展名的静态文件
    if (staticFieldConfig !== undefined) {
        // 读取静态文件
        fs.readFile('.' + path, staticFieldConfig.encoding, function (err, data) {
            if (err) {
                routList[routList.length - 1](
                    request,
                    response,
                    {
                        type: 'file',
                        data: staticFieldConfig,
                        msg: '未找到文件，或文件读取失败'
                    }
                );
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
        if (routList.length > 0) {
            routList.shift()(request, response, routList);
        }
    }
}

/**
 * 路由用户配置的路径，RESTful依靠此实现
 *
 * @param {Object} request HTTP请求对象
 * @param {Object} response HTTP返回对象
 * @param {Array} routList 路由队列（不包含当前的路由规则）
 * @private
 */
function routUserSettingPath(request, response, routList) {
    var serviceRoutConfig;
    var routInfo;
    var servicePath = config.servicePath;
    try {
        serviceRoutConfig = require(servicePath + config.serviceRoutConfigPath);
        routInfo = getRoutInfo(request, serviceRoutConfig);
    }
    catch (err) {
        // 获取用户配置的路由失败，进入下一个分支
        if (routList.length > 0) {
            routList.shift()(request, response, routList);
        }
        else {
            // 失败的抛出和日志
        }
    }

    if (routInfo !== null) {
        try {
            var contentType = getStaticFieldConfig(routInfo.contentType);
            var serviceModel = require(servicePath + routInfo.modelPath);

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
             * 方案一，不污染服务对象，在服务对象的对外方法中需要显示声明参数
             */
            routInfo.arguments.push(request, response);
            var content = serviceModel[routInfo.method].apply(serviceModel, routInfo.arguments);

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
        routList.shift()(request, response, routList);
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
 * @param {Array} routList 路由队列（不包含当前的路由规则）
 * @private
 */
function routAutoPath(request, response, routList) {

}

/**
 * 未找到资源或服务的处理（404）
 *
 * @param {Object} request HTTP请求对象
 * @param {Object} response HTTP返回对象
 * @private
 */
function notFound(request, response) {

}
module.exports = {
    routRequest: routRequest
};