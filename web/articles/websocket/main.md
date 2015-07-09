# WebSocket
 
## 概述

一个双向链接协议，本文主要介绍Node下的实例。更理论的东西请移步这篇知乎帖子：
[http://www.zhihu.com/question/20215561](http://www.zhihu.com/question/20215561)
 
## 安装
 
全局安装 

    npm install -g socket.io
    
局部安装 
   
   npm install socket.io
      
需要注意的是安装目录需要有package.json文件，否则安装失败。

## 需求（目标）

页面上只有一个输入框，多人（A,B,C）访问此页面，只有第一个访问的人（A）有控制权，A输入或删除输入框的内容时，内容被同步到其他人的界面上。

