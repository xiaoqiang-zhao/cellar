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

## 拒绝 js 中拼 html 片段

## CSS也玩起来

## 有了CSS怎么能没有装饰图

## 参考资料

[Webpack 入门指迷](http://sfau.lt/b5kR2G)

