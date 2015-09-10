/**
 * 文章
 *
 * Created by v_zhaoxiaoqiang on 2015/6/1.
 */

module.exports = {
    data: function (request, response, response200, response500) {

        var SocketServer = require('websocket').server;

        // 防止socket重复开启
        if (global.siteSocketServer !== undefined) {
            return {
                status: 1,
                data: 'socket接口已经开启'
            };
        }

        // 开启socket服务
        var socket = new SocketServer({
            httpServer: global.siteHttpServer
        });
        global.siteSocketServer = socket;

        var redBlackBox = [];
        // 服务监听
        socket.on('request', function (request) {

            var connection = request.accept(null, request.origin);

            connection.on('close', function () {
                // 从队列中移除已关闭的链接
                for(var i = 0, len = redBlackBox.length; i < len; i++) {
                    if (redBlackBox[i] === this) {
                        redBlackBox.splice(i, 1);
                        break;
                    }
                }
            });

            // 超级简化的路由
            if (request.resource === '/red-black-box') {
                connection.on('message', function (message) {
                    // 将消息分发
                    for(var i = 0, len = redBlackBox.length; i < len; i++) {
                        redBlackBox[i].send(message.utf8Data);
                    }
                });
                redBlackBox.push(connection);
            }
        });

        return {
            status: 0,
            data: 'socket接口初始化完成'
        };
    }
};