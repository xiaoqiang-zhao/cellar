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

## 描述

做技术探索，从前端到后端搭建 websocket 的应用。建立双相连接，前端和后端互发信息。

页面表现为通过不同的浏览器 或者 多台设备访问同一页面，在其中的一台设备上的操作一个div块的背景颜色会同步到其他浏览器或设备上。

## 后端

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

data函数是一个普通的http服务所调用的函数，可以在[GitHub](https://github.com/longze/cellar) 上 service/websocket-demo 下找到并运行。在服务器端用 `connection.send` 向客户端发信息，用 `connection.on('message', callback）` 监听客户端发来的信息，连接建立后每隔3秒会向客户端发送消息。

## 前端脚本

    var host = 'ws://' + location.host + '/red-black-box';
    // 和服务器建立socket连接，信道建立
    socket = new WebSocket(host);

    socket.onopen = function () {

    };

    // 接受来自服务器的消息
    socket.onmessage = function (message) {
        $('.con').css({
            background: message.data
        });
    };

    socket.onerror = function (error) {
        console.log('WebSocket 链接错误: ' + error);
    };

    $('div div').click(function () {
        // 发送消息
        socket.send($(this).attr('id'));
    });

为了简单起见，我们用jQuery的Ajax发起开启websocket的请求，我们用 `socket.send` 向服务器发送请求，用 `socket.onmessage` 监听服务器发来的信息。

## 浏览器支持情况

Chrome 14 

Firefox 7 

IE 9 - via downloadable Silverlight extension

IE 10 (from Windows 8 developer preview) 

Safari 5.0.2 

iOS 4.2

信息来源：[http://stackoverflow.com/questions/1253683/what-browsers-support-html5-websocket-api](http://stackoverflow.com/questions/1253683/what-browsers-support-html5-websocket-api)