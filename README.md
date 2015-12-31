# cellar 2.0

cellar中文意思酒窖，希望这里的每一篇博文都是一瓶美酒佳酿，这是建立这个项目的美好愿景。

## 项目概述

前端发展到现在（2015.5）已经是一个体系庞杂的技术工种，已不仅是面向浏览器编程实现呈现效果。前端承担着更多的业务流程、用户体验；同时由于代码规模的急速扩张和语言本身的特性，需要独特的工程化管理和模式设计；node的兴起让js的一只脚伸到了服务器端，MongoDB与js数据理念是那么的相像。

所以建立本项目的目的就是收集整理加工各种前端用到的知识、理论和实践经验。包括浏览器也包括服务器端的node，http协议，设计模式，工程化等内容。

目标是提供一个可以本地运行的web服务（用node搭建服务器），包括前端内容。前端的同行可以fork出来自己运行添加自己的内容。
通过对知识维度的抽象，通过配置知识的维度，也适合拿来做通用的知识体系化建设。

作为一个完整的Web服务，你可以用它来搭建自己的mock服务，service/demo 下提供了各种类型请求的范例，下面快速上手给出一些简单的范例。

## 快速上手

    // 启动
    node cellar/server
    
    // mock服务，获取html
    module.exports = {
        contentType: 'html',
        data: function (request, response) {
            return '<h1>Cellar</h1>';
        }
    };
    
    // mock服务，获取json
    module.exports = {
        contentType: 'json',
        data: function (request, response) {
            return {
                "status": 0,
                "result": {},
                "statusInfo": ""
            };
        }
    };
    
    // 需要异步的服务（慢服务示例）
    module.exports = {
        contentType: 'json',
        data: function (request, response, response200, response500) {
            setTimeout(function () {
                response200(
                    this.contentType,
                    {
                        "status": 0,
                        "result": {
                            "description": '我是一个慢请求，需要等3秒才能看到我。'
                        },
                        "statusInfo": ""
                    }
                    // ,'utf-8' 编码格式，
                );
            }, 3000);
        }
    };
    
## 规划与脚步

1.0 搭建Web服务框架

- 研究express搭建网站试试，看看他们的api设计和源码    2015.5.30
- 写实践文档来解析express的优缺点   2015.5.30
- 决定用自己的那套框架还是在express的基础上进行建设   2015.5.30
- 搭建站点框架，支持静态文件   2015.6.1
- 支持RESTful路由配置   2015.6.4
- 支持通过请求路径映射服务   2015.6.6
- Web服务框架搭建完成，编写配置文件，发布v1.0版  2015.6.7

2.0 补充服务与内容，成为可运行的网站

- 端口占用自动非配功能   2015.6.20
- 丰富内容，不少于10篇 2015.7.5
- 添加对异步服务的支持  2015.7.8
- 支持md文档外链本站html格式的demo
- 写http相关的内容，客户端发送、服务器端拼装、客户端解析三部曲

3.0

- 研究前端测试技术，补齐网站的基础架构的单元测试
- 模块化常用类库的功能，真正实现灵活配置需要的前端

4.0

- 购买域名和空间将网站发布到公网
- 逐步完善基础建设
- 研究更多实用的东西编辑成文

5.0
- 抽象知识体系，整理文章
- 在文章达到100+的时候考虑做这件事

## TODOs

完善gulp文章  --- doing

完善git的文章

强化 init-site：清理，复制首页

重写此文档

整理tag

文章内部目录：设计，前端js架构选型

tag的动态操作：功能设计，编码支持

处理文章间的跳转

文章截图的移动

研究sass
