# WebSocket
 
## 概述

一个双向链接协议，本文主要介绍Node下的实例。更理论的东西请移步这篇知乎帖子：
[http://www.zhihu.com/question/20215561](http://www.zhihu.com/question/20215561)
 
## 安装
 
全局安装 

    npm install -g websocket
    
局部安装 
   
   npm install websocket
      
需要注意的是安装目录需要有package.json文件，否则安装失败。

## 需求（目标）

做技术探索，从前端到后端搭建 websocket 的应用。建立双相连接，前端和后端互发信息。

## 后端

    module.exports = {
        data: function (request, response, response200, response500) {
    
            var server = require('websocket').server;
            var socket = new server({
                httpServer: global.http
            });
            var i = 1;
            var connection;
            socket.on('request', function (request) {
                if (!connection) {
                    connection = request.accept(null, request.origin);
                    // resource.resources 用于路由
                }
    
                connection.on('message', function (message) {
                    console.log(message.utf8Data);
                    // var i = 1;
                    setInterval(function () {
                        // 单点发送
                        connection.send('服务器端定时向客户端"单点"发送消息(' + i++ + ')');
                    }, 3000);
                });
    
                connection.on('close', function (webSocketConnectionNum) {
                    console.log('WebSocket连接已关闭');
                });
            });
    
            return {
                status: 0,
                data: 'socket接口初始化完成'
            };
        }
    };

data函数是一个普通的http服务所调用的函数，可以在[GitHub](https://github.com/longze/cellar) 上 service/websocket-demo 下找到并运行。在服务器端用 `connection.send` 向客户端发信息，用 `connection.on('message', callback）` 监听客户端发来的信息，连接建立后每隔3秒会向客户端发送消息。

## 前端

    $.ajax({
        url: 'mysocket',
        success: function (data) {
            var socket;
            document.write(' ---- WebSocket接口初始化完成 ---- <br/>');

            var host = 'ws://' + location.host;
            // 和服务器建立socket连接，信道建立
            socket = new WebSocket(host);
            socket.onopen = function () {
                socket.send('确认已开启WebSocket链接');
                document.write(' ---- WebSocket已开启 ---- <br/>');
            };

            socket.onmessage = function (message) {
                var msg = '来自服务器的WebSocket信息：' + message.data;
                document.write(msg + '，<br/>');
            };

            socket.onerror = function (error) {
                console.log('WebSocket 链接错误: ' + error);
            };
        },
        error: function (data) {
            console.log(data);
        }
    });

为了简单起见，我们用jQuery的Ajax发起开启websocket的请求，我们用 `socket.send` 向服务器发送请求，用 `socket.onmessage` 监听服务器发来的信息。

