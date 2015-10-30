# npm
 
> NodeJs 的默认包管理器
 
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
    
问：噎，我加了问什么还是不行？
    
答：需要给一下权限，代码如下，，这个命令的详细解释看[这篇](http://lucky16.iteye.com/blog/577182)文章。    
    
    chmod a+x my.js
    
    