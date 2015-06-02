/**
 * 启动服务
 *
 * Created by v_zhaoxiaoqiang on 2015/6/1.
 */
var http = require('http');
var rout = require('./rout');
var config = require('./config');

var port = config.defaultPort;

// TODO 端口占用检测

http.createServer(function (request, response) {
    rout.routRequest(request, response);
}).listen(port);

console.log('本地服务器 http://localhost:' + port + ' 已经启动');
console.log('------ 服务器日志 ------');

// 在默认浏览器中打开网站
if (config.isAutoOpenDefaultPage) {
    var cp = require('child_process');
    cp.exec('start http://localhost:' + port + config.defaultPage);
}
