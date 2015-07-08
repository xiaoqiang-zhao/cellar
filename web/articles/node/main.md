# node开发的坑坑洼洼

## 调试环境

### inspector

Web开发使用 `inspector` 插件在chrome中调试。win7下命令行运行 `npm install -g node-inspector` 安装，mac下如果用上面命令可能存在权限问题，如果出现错误无法安装，尝试 `sudo npm install -g node-inspector` 并输入登录密码，输密码时只有一个光标闪，但你可能已经输入了，一口气输完然后回车。

启动调试的命令是 `node-debug 你的程序入口`，如本站的 `server` 可以这样开始调试 `node-debug server`。

**高级用法** 

上面是 `inspector` 最简单的用法，还有一种更为灵活的用法涉及到 `inspector` 的原理。
可以指定调试端口，可以手动启动程序（因为有了这一步我们可以做一些其他的事情，在下面的结合方法中介绍），
具体步骤和解释如下：

    // 创建一个服务
    node-inspector --web-port=8888 &   

这是一个端口为8888的web服务，这个web服务一端是浏览器另一端通过websocket监听v8引擎。
虽然此时会有 `Visit http://127.0.0.1:8888/debug?ws=127.0.0.1:8888&port=5858 to start debugging` 
这样的提示但是此时v8的调试端口并没有确定，下面的命令才会指定v8引擎的调试服务端口。

    // 指定v8的调试端口，并启动v8装载程序
    node --debug-brk=5858 server
    // 当出现 Debugger listening on port 5858 时就证明已经监听成功

5858是v8的调试端口，可以自由指定。
    
    // 在chrome浏览器中打开下面网址 
    http://127.0.0.1:8888/debug?ws=127.0.0.1:8888&port=5858
    
浏览器和引擎通过web socket同步，这样我们就可以进行调试。
另外一点需要说明的是在浏览器中启动调试port参数的值是上面指定v8调试端口，并不一定是提示的5858。
再多说几句，8888 是对浏览器的服务端口，8888服务监听端口了端口5858。
另外由于一些不确定的因素经常出现端口不能释放的情况，
如果按上面步骤不能达到预期的效果，换个端口试试。如果想查看端口的状态，
参考下面的命令： 

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

上面方案的不方便之处在于每次修改完源码并不会反映到调试窗口中，当然小的修改可以直接在天使窗口中进行，但是返回头还需要改源码。
如果要在调试器中看到新代码需要手动关闭再启动node服务。找到一个开源工具可以热启动node，他的原理是监听文件改变，如果有改变自动重启node服务，并打出log。

安装和运行非常简单，命令如下：

    // 安装
    npm install -g hotnode
    // 热启动应用
    hotnode app

Git:[https://github.com/saschagehlich/hotnode](https://github.com/saschagehlich/hotnode)

相似的热启动还有 `node-dev` 、 `supervisor` 和 `nodemon`。

### 两种技术的结合

上面的准备已经做好，倒着一步就水到渠成了，
将inspector中的 `node --debug-brk=5858 server` 换成 `hotnode --debug-brk=5858 server` 就可以了。

## 路径

`require` 加载相对路径的模块时其参考路径是当前的执行文件所在的路径，
`fs` 文件系统读取文件时参考路径是程序的启动路径，
如 `node cellar/server` 的路径是cellar文件夹所在的目录，而 `node server` 是server所在的路径，也就是cellar。

以 `node cellar/server` 为例，
通过全局变量下的属性 `__filename` 拿到当前文件所在文件夹路径，再通过设置相对于此文件向上几级目录是参考根路径拿到绝对路径作为参考。还有一个需要注意的地方就是将windows的左斜杠换成右斜杠。关键代码如下：
    
    // 根路径，config.rootLevel
    rootPath = __dirname.replace(/\\/g, '/').split('/').slice(0, -1 * config.rootLevel).join('/');
    // 然后把根路径加到前面，用的时候就好了
    config.webRootPath = rootPath + config.webRootPath;
    
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
    
## 进程守护

由于node中任何地方报错都会导致退出进程，所以生产环境需要在进程退出后重启，可用的工具：`pm2` 、`forever`.

pm2扩展资料: [http://www.douban.com/note/314200231/](http://www.douban.com/note/314200231/)

forver扩展资料: [http://blog.fens.me/nodejs-server-forever/](http://blog.fens.me/nodejs-server-forever/)