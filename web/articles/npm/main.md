# npm
 
> NodeJs 的默认包管理器。

## 常用命令

为新手注：如果是Mac，遇到权限问题前面加 `sudo`，如果需要密码则为开机密码。

查看npm版本

    npm -v

更新NPM版本
    
    npm install npm -g

安装全局包(以gulp为例，下同)

    npm install gulp -g

局部安装

    npm install gulp

安装某一版本

    npm install gulp@3.7.0 -g
    npm install gulp@3.7.0

查看全局包是否被安装及版本号
    
    gulp -v
    // 如果安装了会显示版本号，如果没有安装会显示
    // “bash: /usr/local/bin/gulp: No such file or directory”

卸载全局包 `gulp`
 
    npm uninstall gulp -g

初始化一个 package.json 

	npm init

安装 package.json 中配置的包

	npm install

## 一些说明

只有全局安装的包才可以直接使用命令行，但是并不是所有包都提供命令行功能，在 `/usr/local/bin` 路径下有相关文件的才能提供命令行功能，但是该文件夹一般为隐藏文件夹。

局部安装的包并非一定不能使用命令行，只是稍微间接一点，以gulp为例，可以在安装目录下这样使用命令行：

     ./node_modules/gulp/bin/gulp.js

来使用命令行。我们通过问答的形式将这个问题深入一下，

问：明明是个js文件为什么可以当做命令来使用？

答：因为js本身就是脚本，当然可以直接运行。

问：那我写个js文件，比如my.js，内容如下，可以直接运行吗？

    console.log('Hi');

答：不行，需要做脚本声明才可以，你看一下gulp.js 第一行就是，代码如下：
    
    #!/usr/bin/env node
    
问：噎，我加了为什么还是不行？
    
答：需要赋权限，代码如下，这个命令的详细解释看[这篇](http://lucky16.iteye.com/blog/577182)文章。    
    
    chmod a+x my.js
    
问：直接这样吗？
    
    my.js
    
答：需要下面这样：
    
    ./my.js
    
问：这次真的可以了吗？好麻烦，这么多坑
    
答：当然可以了！其实上面这些配置是在 `npm install xxx` 的时候就做好了不需要手动配置，如果你要开发命令行工具可以去查看[这篇文章](http://javascriptplayground.com/blog/2012/08/writing-a-command-line-node-tool/)。

## 一个包的构成

package.json 描述文件，包括包的介绍，版本，依赖，作者，git 和 npm 等信息。

CHANGELOG.md 存放包升级时个版本的改动。

LICENCE 许可协议

README.md 包的使用说明书

bin 文件夹用来存放此包的实现代码。

node_modules 文件夹用来存放当前包所以来的包。

上面所有的这些都是可选的，一个符合 CommonJs 规范的 js 文件就可以作为一个包来使用，为了托管 npm 的统一制定了上面规范，如果你不考虑别人能不能看的懂 和 看的爽不爽 你可以忽略任何一条。

npm WARN package.json demo@ No repository field.

	"repository": {
	  "type": "git",
	  "url": "git://github.com/username/repository.git"
	},
	// 或者这样也可以
	"private": true

npm WARN package.json demo@ No README data

npm WARN package.json demo@ No license field.

## dependencies和devDependencies的区别

一个node package有两种依赖，一种是dependencies一种是devDependencies，其中前者依赖的项该是正常运行该包时所需要的依赖项，而后者则是开发的时候需要的依赖项，像一些进行单元测试之类的包。

如果你将包下载下来在包的根目录里运行

	npm install

默认会安装两种依赖，如果你只是单纯的使用这个包而不需要进行一些改动测试之类的，可以使用

	npm install --production

只安装dependencies而不安装devDependencies。

如果你是通过以下命令进行安装

	npm install packagename

那么只会安装dependencies，如果想要安装devDependencies，需要输入

	npm install packagename --dev 
	
## 写一个包贡献给全世界

待续...

## 一些技巧

安装国内的镜像npm，可使安装更快，15分钟与国外同步一次

    npm install -g cnpm --registry=http://registry.npm.taobao.org

--save 与 --save-dev

当为模块安装一个依赖模块时，正常情况下得先安装他们（在模块根目录下npm install module-name），然后连同版本号手动将他们添加到模块配置文件package.json中的依赖里（dependencies）。

-save和save-dev可以省掉你手动修改package.json文件的步骤。

`spm install module-name -save` 自动把模块和版本号添加到dependencies部分。

`spm install module-name -save-dve` 自动把模块和版本号添加到devdependencies部分。

至于配置文件区分这俩部分， 是用于区别开发依赖模块和产品依赖模块，devDepandencies主要是配置测试框架， 例如jshint、mocha。

## 更新 node

node有一个模块叫n（这名字可够短的。。。），是专门用来管理node.js的版本的。首先安装n模块：

	npm install -g n

然后升级node.js到最新稳定版

	n stable

## 参考资料

[淘宝 NPM 镜像](http://segmentfault.com/a/1190000000471219)

[npm国内镜像介绍](https://cnodejs.org/topic/4f9904f9407edba21468f31e)

[package.json](https://www.npmjs.org/doc/json.html)

[npm-install](https://www.npmjs.org/doc/cli/npm-install.html)