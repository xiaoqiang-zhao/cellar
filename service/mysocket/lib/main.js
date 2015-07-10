/**
 * 文章
 *
 * Created by v_zhaoxiaoqiang on 2015/6/1.
 */

var server = require('websocket').server;
var socket = new server({
    httpServer: global.http
});
var i = 1;
socket.on('request', function (request) {
    var connection = request.accept(null, request.origin);
    // resource.resources 用于路由

    connection.on('message', function (message) {
        console.log(message.utf8Data);
        var i = 1;
        setInterval(function () {
            // 单点发送
            connection.send('服务器端定时向客户端"单点"发送消息(' + i++ + ')');

            // 广播
            // connection.emit('服务器端定时向客户端"广播"发送消息(' + i++ + ')');
        }, 3000);
    });

    connection.on('close', function (connection) {
        console.log('WebSocket连接已关闭');
    });
});

module.exports = {
    data: function (request, response, response200, response500) {

        return {
            status: 0,
            data: 'socket接口初始化完成'
        };

    }
};