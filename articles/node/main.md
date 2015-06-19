# node开发的坑坑洼洼

## 调试环境

### inspector

Web开发使用 `inspector` 插件在chrome中调试，
win7下命令行运行 `npm install -g node-inspector` 安装，
mac下如果用上面命令可能存在权限问题，如果出现错误无法安装，尝试 `sudo npm install -g node-inspector` 并输入登录密码，
输密码时只有一个光标闪，但你可能已经输入了，一口气输完然后回车。

启动调试的命令是 `node-debug 你的程序入口`，如本站的 `server` 可以这样开始调试 `node-debug server`。

**高级用法** 

上面是 `inspector` 最简单的用法，还有一种更为灵活的用法涉及到 `inspector` 的原理。
可以指定调试端口，可以手动启动程序（因为有了这一步我们可以做一些其他的事情，在下面的结合方法中介绍），
具体步骤和解释如下：

    // 创建一个托管服务
    node-inspector --web-port=8888 &   
    // 其中会启动一个端口为8888的web服务，再启动一个v8引擎，服务端口默认是5858
    
    // 将代码交给上面启动的引擎，启动监听 （也可以有其他的说法）
    node --debug-brk=5858 server
    // 当出现 Debugger listening on port 5858 时就证明已经监听成功
    
    // 在chrome浏览器中打开下面网址 
    http://127.0.0.1:8888/debug?ws=127.0.0.1:8888&port=5858
    // 浏览器和引擎通过web socket同步，这样我们就可以进行调试

再多说几句，8888 是对浏览器的服务端口，8888服务监听端口了端口5858。
另外由于一些不确定的因素经常出现端口不能释放的情况，
如果按上面步骤不能达到预期的效果，用 `lsof -i:port` 查看端口是否被占用，其中port是要查看的端口，
如  `lsof -i:5858`。
如果被占用了可以关闭命令行，关闭浏览器调试窗口，或者去喝杯咖啡休息一下...
关于命令行，还有一些其他的命令： 

    // 打开新的命令行窗口
    Mac:com + n   Win7:Win + R / cmd
    // 清空命令行窗口的内容
    Mac:com + k   Win7:cls
    // 查看端口的存活情况
    Mac:lsof -i:8899  Win7:netstat -ano|findstr "8899"
    // 查看端口占用情况
    Mac:lsof -i -P    Win7:netstat -ano

Git:[https://github.com/node-inspector/node-inspector](https://github.com/node-inspector/node-inspector)

### hotnode

上面方案的不方便之处在于每次修改完源码并不会反映到调试窗口中，
当然小的修改可以直接在天使窗口中进行，但是返回头还需要改源码。
如果要在调试器中看到新代码需要手动关闭再启动node服务。
找到一个开源工具可以热启动node，他的原理是监听文件改变，如果有改变自动重启node服务，并打出log。
安装盒运行非常简单，命令如下：

    // 安装
    npm install -g hotnode
    // 热启动应用
    hotnode app

Git:[https://github.com/saschagehlich/hotnode](https://github.com/saschagehlich/hotnode)

### 两种技术的结合

上面的准备已经做好，倒着一步就水到渠成了，
将inspector中的 `node --debug-brk=5858 server` 换成 `hotnode --debug-brk=5858 server` 就可以了。

## 路径

`require` 加载相对路径的模块时其参考路径是当前的执行文件所在的路径，
`fs` 文件系统读取文件时参考路径是程序的启动路径，
如 `node cellar/server` 的路径是cellar文件夹所在的目录，而 `node server` 是server所在的路径，也就是cellar。

以 `node cellar/server` 为例，
我们可以通过 `process.cwd()` 来拿到启动路径 `直到盘符根路径/code`，
通过全局变量下的属性 `__filename` 拿到当前文件路径 `直到盘符根路径/code/cellar/server/lib/所在的js文件`，
通过全局变量下的属性 `__dirname` 拿到当前文件所在路径  `直到盘符根路径/code/cellar/server/lib`。
可以看到一个特点，当前js所在的路径到项目根路径是固定的，而启动路径肯定是当前js的上层目录，
利用这个特点，提供一种不完美的解决方案：
    
    // 由于当前js到项目根路径（或者统一的参照路径）是固定的，
    // 所以通过硬编码来定义一个参考路径，从上到下找文件符合人类思维代码更易读;
    // 不好的是如果修改了目录结构此需要手动修改这里，会有坑在这里
    var requirePathRoot = '../..';
    
    // 通过掐头去尾，可以得到文件访问的统一参照路径，最好是指向和上面requirePathRoot相同的路径
    // 这样在模块引用和文件读取时就可以用相同的路径，当然前面加上各自的pathRoot
    // 注意将windows下的左斜杠替换成右斜杠
    var filePathRoot = __dirname.replace(process.cwd(), '').replace(/\\/g, '/'); // 掐头
    filePathRoot = filePathRoot.replace(/\/server\/lib$/, '');  // 去尾
    // 加相对路径，去头之后是以斜杠开头的
    filePathRoot = '.' + filePathRoot;
    
## 异步队列

下面是一个路由队列的方案，每个成功后调用下一个，在最后一个中做404处理。

    // 路由队列（路由的优先顺序在此配置）
    var routList = [
        routStaticFile,
        routUserSettingPath,
        routAutoPath,
        notFound
    ];

    /* 异步编程的队列方案 */
    routList.shift()(request, response, routList);
    
