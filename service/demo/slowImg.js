/**
 * 慢请求CSS
 *
 * Created by zhaoxiaoqiang on 15/6/6.
 */
var fs = require('fs');
module.exports = {
    contentType: 'jpg',
    data: function (request, response, response200, response500) {
        var contentType = this.contentType;
        setTimeout(function () {
            // 业务逻辑代码
            // ...
            // 由于文件读取和启动路径有关，请使用 node server命令启动
            fs.readFile('./service/demo/0.jpg', 'binary', function (err, data) {
                if (err) {

                }
                else {
                    response200(contentType, data, 'binary');
                }
            });
        }, 5000);
    }
};