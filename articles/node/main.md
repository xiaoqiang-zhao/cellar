# node开发的坑坑洼洼

## 调试环境

Web开发使用 `inspector` 插件在chrome中调试，
win7下命令行运行 `npm install -g node-inspector` 安装，
mac下如果用上面命令可能存在权限问题，如果出现错误无法安装，尝试 `sudo npm install -g node-inspector` 并输入登录密码，
输密码时只有一个光标闪，但你可能已经输入了，一口气输完然后回车。

启动调试的命令是 `node-debug 你的程序入口`，如本站的 `server` 可以这样开始调试 `node-debug server`。

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
    var filePathRoot = __dirname.replace(process.cwd(), ''); // 掐头
    filePathRoot = filePathRoot.replace(/\/server\/lib$/, '');  // 去尾
    // 加相对路径，去头之后是以斜杠开头的
    filePathRoot = '.' + filePathRoot;
    
## 异步队列

下面是一个路由队列的方案，每个成功后调用下一个，在最后一个中做404处理，

    // 路由队列（路由的优先顺序在此配置）
    var routList = [
        routStaticFile,
        routUserSettingPath,
        routAutoPath,
        notFound
    ];

    /* 异步编程的队列方案 */
    routList.shift()(request, response, routList);
    
