/**
 * Created by zhaoxiaoqiang on 15/6/6.
 */
module.exports = {
    contentType: 'json',
    data: function (request, response, response200) {
        return {
            "status": 0,
            "result": {
                name: 'cellar'
            },
            "statusInfo": ""
        };
    }
};