/**
 * 慢请求
 *
 * Created by zhaoxiaoqiang on 15/6/6.
 */
module.exports = {
    contentType: 'js',
    data: function (request, response, response200, response500) {
        var contentType = this.contentType;
        setTimeout(function () {
            // 业务逻辑代码
            // ...

            // 返回异步执行后的结果
            response200(
                contentType,
                'alert("慢js，5秒");'
                // ,'utf-8' 编码格式，
            );

            // 如果有错误，在可以在这里向外抛异常
            // response500();
        }, 5000);
    }
};