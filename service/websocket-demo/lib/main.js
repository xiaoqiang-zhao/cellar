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

        var i = 1;
        var collectionList = [];
        var redBlackBox = [];
        // 服务监听
        socket.on('request', function (request) {

            var connection = request.accept(null, request.origin);

            connection.on('close', function (webSocketConnectionNum) {
                // TODO 从队列中移除
            });

            var item = {
                key: request.key,
                connection: connection,
                request: request
            };

            // 超级简化的路由
            if (request.resource === '/red-black-box') {
                connection.on('message', function (message) {
                    // 将消息分发
                    for(var i = 0, len = redBlackBox.length; i < len; i++) {
                        redBlackBox[i].connection.send(message.utf8Data);
                    }
                });
                redBlackBox.push(item);
            }

            collectionList.push(item);

            //connection = request.accept(null, request.origin);
            //
            //connection.on('message', function (message) {
            //    console.log(message.utf8Data);
            //    // var i = 1;
            //    setInterval(function () {
            //        // 单点发送
            //        connection.send('服务器端定时向客户端"单点"发送消息(' + i++ + ')');
            //    }, 3000);
            //});
            //
            //connection.on('close', function (webSocketConnectionNum) {
            //    console.log('WebSocket连接已关闭');
            //});
        });

        return {
            status: 0,
            data: 'socket接口初始化完成'
        };
    }
};