/**
 * 文章
 *
 * Created by v_zhaoxiaoqiang on 2015/6/1.
 */
var http = require('http');
var io = require('socket.io')(http);

module.exports = {
    data: function (articleName, request, response) {
        return '临时，访问名：' + articleName;
    }
};