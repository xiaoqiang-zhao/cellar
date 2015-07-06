/**
 * 启动服务
 *
 * Created by v_zhaoxiaoqiang on 2015/6/1.
 */
var http = require('http');
var rout = require('./rout');
var config = require('./config');
var portModel = require('./port');
var port = config.defaultPort;

http = http.createServer(function (request, response) {
    rout.routRequest(request, response);
});

// 端口占用检测,如果端口占用加一再试
portModel.getAvailablePort(port, function (port) {
    // 启动web服务监听
    http.listen(port, function () {
        // 监听失败(如端口冲突)不会执行此回调
        console.log('本地服务器 http://localhost:' + port + ' 已经启动');
        // console.log('首页地址 http://localhost:' + port + config.defaultPage);

        console.log('------ 服务器日志 ------');

        // 在默认浏览器中打开网站(Mac下无效)
        if (config.isAutoOpenDefaultPage) {
            var url = 'http://' + getIPAdress() + ':' + port + config.defaultPage;
            var pc = require('child_process');
            // Windows
            if (process.platform === 'win32' || process.platform === 'win64') {
                pc.exec('start ' + url);
            }
            // Mac，Linux
            else {
                pc.spawn('open', [url]);
            }
        }
    });
});

function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}