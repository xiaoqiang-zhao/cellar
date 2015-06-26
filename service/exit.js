/**
 * Created by zhaoxiaoqiang on 15/6/6.
 */
module.exports = {
    contentType: 'json', // 返回的数据类型
    data: function (request, response) {
        GLOBAL.siteData = GLOBAL.siteData || {};
        GLOBAL.siteData.currentId = -1;
        return {
            status: 0,
            data: {},
            info: '退出成功'
        };
    }
};