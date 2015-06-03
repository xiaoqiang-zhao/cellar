/**
 * 路由请求
 *
 * Created by v_zhaoxiaoqiang on 2015/6/1.
 */

var fs = require('fs');
var url = require('url');
var config = require('./config');

function routRequest(request, response) {
    var routList = [
        routStaticFile,
        routUserSettingPath,
        routAutoPath,
        notFound
    ];

    /* 异步编程的队列方案 */
    routList.shift()(request, response, routList);

    /* 异步队列不能用循环
     routList.some(function (item) {
     try {
     result = item(request, response);
     }
     catch (err) {

     }
     return result;
     });
     */
}

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
}

function routUserSettingPath() {

}

function routAutoPath() {

}

function notFound() {

}
module.exports = {
    routRequest: routRequest
};