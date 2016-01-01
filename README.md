# cellar 2.0

> cellar中文意思酒窖，希望这里的每一篇博文都是一瓶美酒佳酿，这是建立这个项目的美好愿景。

## 项目概述

秉承 cellar 1.0 的内容，cellar 2.0 在工程方面方面进一步升级。如果 1.0 是酒窖，那么 2.0 就是“酒窖的成产工具”，是的你没看错是“生产酒窖”，为那和我一样有酿造和收藏兴美酒趣的人。用专业的术语讲这是一个静态博客内容生成工具，在本项目中使用 markdown 编写，然后一行命名发布。就是这么简单，让你专注于内容。另外生成的静态站做了响应式设计，可以兼容 pc 和 移动端。

## 快速上手

首先安装 node，具体怎么安装请自行问度娘；

其次安装本项目需要的 node 模块，在本项目根路径下运行下面命令:

    npm install

启动网站(依然在本项目根路径下运行)
       
    node server

## 其他设置

### 写文章

在 `web/articles` 下新建文件夹，在此文件夹下新建 main.md 文件，参考示例编写你的内容。写完之后，运行下面命令(依然在本项目根路径下运行)，此命令会将文章生成到首页，同时将整个博客的对外发布部分拷贝到与 cellar 同级的 `my-blog` 文件夹下，如果想要发布到本地的其他地方，可在 `cellar/tool/init/lib/config.js` 中配置。

    node tool/init-site

只需要写 md 文件就可以，`data.json` 和 `main.html` 可由上面命令生成。在 `data.json` 中可以通过  `isPublished` 配置文章是否发布出去，通过 `tags` 可以配置文章标签；`main.html` 是为搜索引擎生成的静态页面。  

### 设置头像等信息

头像的图片是 `cellar/web/src/components/header/picture.png`，请同名替换成你自己的。其他网站的全局信息可以在 `cellar/tool/init-site/bin/config.js` 中配置。需要注意的是需要执行下面命令才生效。

	// 全局安装 webpack
	npm install webpack -g
	// 在 cellar/tool 下运行
	webpack -p
	// 生成页面
	node tool/init-site

注：此过程有些复杂，可以找办法优化。

### 发布网上

此工具生成的是一套静态网站，如果有自己的服务器只需要将 `my-blog` 下的内容放到网站根目录下就可以。

如果没有自己的服务器，可以在 github 上开通个人站点，作为一个开源项目上传，如何开通和上传请参考 [github 官方文档](https://pages.github.com/)。参考[本开源项目发起人龙则的个人站点](https://longze.github.io)。

## 写给开发者的

待续...

## TODOs

这是一个幼小的开源项目，还有很多需要完善的地方，如果你感兴趣，我们可以一起来做这件有意思的事情，下面是我想做还没来得及做的一些改进点，欢迎贡献代码。如果你建议添加一些其他功能，请在 Issues 中提出方便管理。如果你想吐槽我的代码也是乐于受教的，同样在 Issues 中提出。

- 配置生成 header.tpl

- css 预处理

- 将 webpack 的压缩集成在 init-site 中

- 优化 webpack 的配置