/**
 * Created by zhaoxiaoqiang on 15/6/6.
 */
module.exports = {
    contentType: 'json', // 返回的数据类型
    data: function (request, response) {
        GLOBAL.siteData = GLOBAL.siteData || {};
        var data;
        if (GLOBAL.siteData.currentId > 0) {
            data = {
                status: 0,
                data: {
                    name: 'cellar'
                },
                inf: '当前登陆用户信息'
            };
        }
        else {
            data = {
                status: 1,
                inf: '未登录或登录超时'
            };
        }

        return data;
    }
};