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
    // 接到客户端请求时走路由
    rout.routRequest(request, response);
});

// 端口占用检测,如果端口占用加一再试
portModel.getAvailablePort(port, function (port) {
    // 启动web服务监听
    http.listen(port, function () {
        var ip = getIPAdress();
        // 断网情况下拿不到 DNS 分配的 IP 地址
        if (ip === undefined) {
            ip = 'localhost';
        }

        var url = 'http://' + ip + ':' + port;
        console.log('本地服务器 ' + url + ' 已经启动');
        console.log('------ 服务器日志 ------');

        // 在默认浏览器中打开网站
        if (config.isAutoOpenDefaultPage === true) {
            var indexPageUrl = url + config.defaultPage;
            var cp = require('child_process');
            // Windows
            if (process.platform === 'win32') {
                cp.exec('start ' + indexPageUrl);
            }
            // Mac，Linux
            else {
                cp.spawn('open', [indexPageUrl]);
            }
        }

        // 将http全局化，方便做WebSocket
        global.http = http;
    });

    // 将http全局化，方便做WebSocket
    global.siteHttpServer = http;
});

/**
 * 获取本机IP
 *
 * @returns {string} ip地址
 */
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
