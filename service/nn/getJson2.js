/**
 * Created by zhaoxiaoqiang on 15/6/6.
 */
module.exports = {
    contentType: 'json', // 返回的数据类型
    data: function (request, response) {
        return {
            "status": 1,
            "statusInfo": "通知信息主键不能为空"
        };
    }
};