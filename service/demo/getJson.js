/**
 * Created by zhaoxiaoqiang on 15/6/6.
 */
module.exports = {
    contentType: 'json',
    data: function (request, response, response200, response500) {
        // 直接返回
        return {
            "status": 0,
            "result": {
                name: 'cellar'
            },
            "statusInfo": ""
        };

        // 异步返回
        /*
        var contentType = this.contentType;
        setTimeout(function () {
            // 业务逻辑代码
            // ...

            // 返回异步执行后的结果
            response200(
                contentType,
                {
                    "status": 0,
                    "result": {
                        "description": '描述'
                    },
                    "statusInfo": ""
                }
                // ,'utf-8' 编码格式，
            );

            // 如果有错误，在可以在这里向外抛异常
            // response500();
        }, 0);
        */
    }
};