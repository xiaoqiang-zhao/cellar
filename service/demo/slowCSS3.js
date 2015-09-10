/**
 * 慢请求CSS
 *
 * Created by zhaoxiaoqiang on 15/6/6.
 */
module.exports = {
    contentType: 'css',
    data: function (request, response, response200, response500) {
        var contentType = this.contentType;
        setTimeout(function () {
            // 业务逻辑代码
            // ...

            // 返回异步执行后的结果
            response200(
                contentType,
                '.a { background: #333; color: #fff0ff; padding: 30px; text-align: center;}'
            );
        }, 3000);
    }
};