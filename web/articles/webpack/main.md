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

## 调试

先说说source maps，source maps 是将合并后的文件拆分成源文件以方便调试的一种技术，在合并文件的末尾看到下面这样的一行声明，就表示当前文件是合并而来，而合并后的文件通过"main.js.map"重新拆解开来，不打开开发者工具时不会加载 .map 文件也不会拆解，声明也被当做普通的注释来处理，打开开发者工具后需要刷新才可以拆解文件(也就是是否拆解在加载资源时决定)可以在拆解后的文件上打断点调试，当前的 Chrome,FireFox,Safari,IE11 已经支持。

	//# sourceMappingURL=main.js.map

顺便介绍一下 webpack 的参数，	

	webpack           // 不加参数，合并文件  
	webpack -p        // 压缩混淆脚本
	webpack --watch   // 监听变动并自动打包
	webpack -d        // 生成和并文件和map拆解文件

[完整示例](./demo/js/index.html)

[chrome source Maps官方资料](https://developer.chrome.com/devtools/docs/javascript-debugging#source-maps)

## webpack 插件


[加载器使用文档](http://webpack.github.io/docs/using-loaders.html)	
	
## 拒绝 js 中拼 html 片段

使用 html-loader 插件可以使 html 片段转化成字符串模块，模块安装命令如下：

	npm install html-loader

html 模块示例如下：
	
	// b.html
	<div>
        Hello world.
    </div>

使用示例：
	
	// a.js
	var b = require('./b.html');
    document.getElementById('container').innerHTML = b;

配置示例代码较长请自行到 html/webpack.config.js 中查看，[完整运行示例](./demo/html/index.html)。

任何前端模板引擎的本质都是将 html 片段转换为函数，然后再以数据为参数调用该函数再返回 html 片段。在实际项目中不结合数据的 html 片段是很少的，所以将 html 模块转换成模板模块有两点好处：

- 不再需要前端加载模板引擎库

- 不再需要将 html 解析成函数

webpack 的插件中提供了多种模板引擎解析器供选择，可选择适合自己项目的模板引擎集成到 webpack 打包工具中。

## CSS也玩起来

需要两个插件:css-loader将 css 作为模块加载进来，style-loader 将样式写进页面。

	 npm install style-loader css-loader

IE8 及以下有一个 Style 个数超过32后面的不识别的 bug，在生成的 js 文件中可以看到对低版本的 IE 做了判断。下面是配置文件部分代码：

	// webpack.config.js
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			}
		]
	}

在 js 模块中直接 require 就可以在当前页面创建 style 标签并将 css 文件的内容添加到其中。
	
	require('./css-1.css');
	
[完整示例](./demo/css/index.html)

## 有了CSS怎么能没有装饰图

使用 url-loader 加载器可以直接将图片文件转成 base64内容打包到 CSS 中，加载器安装：
	
	 npm install url-loader

CSS 的写法和普通的一样，部分配置代码如下：

	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			},
			{
				test: /\.png$/,
				loader: "url-loader?limit=100000"
			}
		]
	}

## 参考资料

[webpack 官网](https://webpack.github.io/)

[webpack GitHub](https://github.com/webpack/webpack)

[加载器的使用方法](http://webpack.github.io/docs/using-loaders.html)

[Webpack 入门指迷](http://sfau.lt/b5kR2G)

[webpack 加载器](https://webpack.github.io/docs/list-of-loaders.html)

[chrome source Maps官方资料](https://developer.chrome.com/devtools/docs/javascript-debugging#source-maps)


