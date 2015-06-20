/**
 * Created by zhaoxiaoqiang on 15/6/19.
 *
 * 提供http的接口探测和查找可用端口服务
 */

var DefaultPort = 8080;
/**
 * 查看端口是否可用
 *
 * @param {String | Number} port 要检查的端口
 * @param {Function} callback 回调函数
 *        {Boolean} isAvailable 是否可用（给回调的参数）
 */
function isAvailable(port, callback) {
    port = port / 1;
    // 参数校验
    if (Number.isNaN(port)) {
        callback (false);
    }
    // 检查端口是否占用
    else {
        var net = require('net');
        var tester = net.createServer().once('error', function (err) {
            tester.close();
            // 端口被占用
            if (err.code === 'EADDRINUSE') {
                callback(false);
            }
        }).once('listening', function() {
            tester.close();
            callback(true);
        }).listen(port);
    }
}

/**
 * 获取一个可用端口
 *
 * @param {String | Number} port 默认端口
 * @param {Function} callback 回调函数
 *        {Number} port 一个可用的端口
 */
function getAvailablePort(port, callback) {
    port = port / 1;
    // 参数校验
    if (Number.isNaN(port)) {
        port = DefaultPort;
    }
    isAvailable(port, function (isAvailable) {
        if (isAvailable === true) {
            callback(port);
        }
        else {
            port++;
            getAvailablePort(port, callback);
        }
    });
}

module.exports = {
    isAvailable: isAvailable,
    getAvailablePort: getAvailablePort
};