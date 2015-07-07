/**
 * Created by zhaoxiaoqiang on 15/6/6.
 */
module.exports = {
    contentType: 'json', // 返回的数据类型
    data: function (request, response) {
        return {
            "status": 0,
            "result": [
                {
                    "noticeId": 1,
                    "content": "贵公司欠费20000元，请及时缴纳。"
                },
                {
                    "noticeId": 2,
                    "content": "贵公司欠费10000元，请及时缴纳。"
                }
            ],
            "statusInfo": ""
        };
    }
};