/**
 * 慢请求
 *
 * Created by zhaoxiaoqiang on 15/6/6.
 */
module.exports = {
    contentType: 'json',
    data: function (request, response, response200) {
        setTimeout(function () {
            response200(
                this.contentType,
                {
                    "status": 0,
                    "result": {
                        "description": '我是一个慢请求，需要等3秒才能看到我。'
                    },
                    "statusInfo": ""
                }
                // ,'utf-8' 编码格式，
            );
        }, 3000);
    }
};