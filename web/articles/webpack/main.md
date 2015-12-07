# 一步一步学习 webpack

> webpack 是什么？一个命令行打包工具，把 js、css 甚至图片打成一个或多个包供页面引用。我们从简单到复杂通过一个一个的例子来学习 webpack，所有实例都可以在我的 git 上下载到源码。

## webpack 是什么？

一个命令行打包工具，把 js、css 甚至图片打成一个或多个包供页面引用。

## 2分钟跑起来

NodeJs 的安装就不多说了，webpack 的全局安装命令如下：

	npm install webpack -g

准备配置文件 webpack.config.js

	module.exports = {
        entry: {
            main: './a.js'
        },
    
        output: {
            path: './dist/',
            publicPath: '/js/',
            filename: '[name].js'
        }
    };

入口模块 a.js，依赖模块b.js

	// a.js
	var b = require('./b');
    var text = 'hello ' + b.text;
    document.getElementsByTagName('body')[0].innerHTML = text;
    exports.model = {
        text: text
    };
    
    // b.js
    module.exports = {
        text: 'world.'
    };

上面所有文件放在同一目录下面，在此目录下命令运行

	webpack

就生成了 main.js，可被页面直接使用。

## 简单解释几句

webpack 兼容 AMD 和 CMD 以及 CommonJs 规范，官方建议使用 CommonJS 的规范来组织模块关系。如果对前面的三个规范还不了解可以看我的另一篇文章[js 模块化](./../js-module/main.html)。webpack 也可算是预编译类的模块管理工具，所有的资源都被打包放在一起统一加载，虽然有一些技巧可以打出多个包或提取多个包之间的公用模块，但这种 all in one 的思想需要注意，用空间换时间带来不可避免的问题是加载用户可能用不到的资源(即非按需加载)，从而造成初始化时间变长移动端流量浪费等问题。在 http/2 场景下使用此方案做做整站打包的话劣势就会更加明显，所以面对当前国内的网络环境和大多数应用场景一个较为推荐的方案是使用 webpack 做与业务无关的组件打包，用 AMD 或 CMD 做业务的拆分打包(为了按需加载)，前端资源库单独引用或打包后整体引用。好了扯远了，我们继续 webpack。

## sourcesMap

	webpack -d  
	// shortcut for --debug --devtool sourcemap --output-pathinfo


## 拒绝 js 中拼 html 片段

	npm install webpack html-loader -g


## CSS也玩起来

## 有了CSS怎么能没有装饰图

## 参考资料

[webpack 官网](https://webpack.github.io/)

[webpack GitHub](https://github.com/webpack/webpack)

[Webpack 入门指迷](http://sfau.lt/b5kR2G)

[webpack 加载器](https://webpack.github.io/docs/list-of-loaders.html)

