# cellar 2.2.0

> cellar中文意思酒窖，希望这里的每一篇博文都是一瓶美酒佳酿，这是建立这个项目的美好愿景。

## 项目概述

秉承 cellar 1.0 的内容，cellar 2.x 在工程方面方面进一步升级。如果 1.0 是酒窖，那么 2.x 就是“酒窖的成产工具”，是的你没看错是“生产酒窖”，为那和我一样有酿造和收藏兴趣美酒的人。用专业的术语讲这是一个静态博客内容生成工具，在本项目中使用 markdown 编写，然后一行命名发布。就是这么简单，让你专注于内容。另外生成的静态站做了响应式设计，可以兼容 pc 和 移动端。

## 快速上手

首先安装 node，像安装 QQ 一样简单，到[NodeJs中文网](http://nodejs.cn/)下载安装包；

其次安装本项目依赖的 node 模块，在本项目根路径下运行下面命令:

    npm install

启动网站(依然在本项目根路径下运行)，到此为止你的个人博客已经运行起来了。
       
    node server

## 开始表现自己吧

### 初始化网站

头像的图片位置： `cellar/web/src/components/header/picture.png`，请同名替换成你自己的。网站的其他全局信息(包括 title、主标题、副标题)可以在 `cellar/tool/init-site/bin/config.js` 中配置。运行下面完成网站初始化。

	node tool/init-site

### 写文章

在 `web/articles` 下新建文件夹，在此文件夹下新建 main.md 文件，参考示例编写你的内容。写完之后，运行下面命令(依然在本项目根路径下运行)，此命令会将文章生成到首页，同时将整个博客的对外发布部分复制粘贴到与 cellar 同级的 `my-blog` 文件夹下，如果想要复制粘贴到本地的其他地方，可在 `cellar/tool/init-site/lib/config.js` 中配置。

    node tool/publish

只需要写 md 文件就可以，`data.json` 和 `main.html` 可由上面命令生成。在 `data.json` 中可以通过  `isPublished` 配置文章是否发布出去，通过 `tags` 可以配置文章标签；`main.html` 是为搜索引擎生成的静态页面。  

### 发布网上

此工具生成的是一套静态网站，如果有自己的服务器只需要将 `my-blog` 下的内容放到网站根目录下就可以。

如果没有自己的服务器，可以在 github 上开通个人站点，作为一个开源项目上传，如何开通和上传请参考 [github 官方文档](https://pages.github.com/)。最后的成果请参考[本开源项目发起人龙则的个人站点](https://longze.github.io)。

## cellar 2.1 的改进点

- 调整配置参数，将 init-site 拆成 init-site 和 publish 两部分
- 添加 “执行 init-site 时附加执行 publish” 功能
- 简化 SEO 部分的生成逻辑
- 优化前端代码，添加 vue 别名等
- 添加“文章列表按文章发布时间倒序的功能”
- 完善 tag 功能，无 tag 时不显示 tag 区域
- 添加单页应用中对图片路径的相对化处理
- 完善 Licence 信息，明确指定为 MIT 许可

## cellar 2.2.0 的改进点

- 修正 cellar 技术文档在 README.md 中的路径引用错误
- 将 webpack 的配置提取到单独文件
- 添加对未发布文章的列表查看功能
- 删除 index-owner和其相关代码逻辑
- 添加markdown 解析链接时的title 属性
- 添加发布复制 favicon.ico 功能
- 添加对博客文件夹清除非最新版 dist 的功能
- 完善 route-view 和 v-link 的使用
- 更新 cellar 技术文档
- 将压缩资源的版本号与项目的版本号进行统一
- 从此版开始“语义化版本管理”
[相关描述参见此译文](http://f2e.souche.com/blog/fan-yi-ru-he-zheng-que-de-ming-ming-ruan-jian-ban-ben-hao/?from=timeline&isappinstalled=0)

## 作者寄语

这是一个幼小的开源项目，还有很多需要完善的地方，如果你感兴趣，我们可以一起来做这件有意思的事情，下面是我想做还没来得及做的一些改进点，欢迎贡献代码。如果你建议添加一些其他功能，请在 Issues 中提出方便管理。如果你想吐槽我的代码也是乐于受教的，同样在 Issues 中提出。

- css 预处理

这个系统是我对前端模块化和工程化的一个探索，抛开这个工具业务本身，在技术和工程层面也很值得探索，技术细节请参考 "[cellar 技术文档](./web/articles/cellar-doc/main.md)"
