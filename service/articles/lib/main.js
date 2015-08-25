/**
 * 文章
 *
 * Created by v_zhaoxiaoqiang on 2015/6/1.
 */
module.exports = {
    contentType: 'json',
    data: function (request, response, response200, response500) {

        //var dataServer = require('./data-server');
        //var ref = new dataServer('/https://longze.wilddogio.com');
        //ref.on('value', function (datasnapshot) {
        //    response200(
        //        contentType,
        //        {
        //            "status": 0,
        //            "result": datasnapshot.val(),
        //            "statusInfo": ""
        //        }
        //        // ,'utf-8' 编码格式，
        //    );
        //});

        return '临时，访问名：' + articleName;
    }
};