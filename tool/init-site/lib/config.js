/**
 * 配置文件
 *
 * Created by zhaoxiaoqiang on 15/10/13.
 */

var config = {
    encoding: 'utf-8',

    // 网站的配置
    siteData: {
        // 网页的 title
        title: '网站 title',
        // 网站的主标题
        mainHead: '网站的主标题',
        // 网站的副标题
        subhead: '网站的副标题'
    },
    templates: [
        {
            from: 'index-template.html',
            to: 'web/index-template.html'
        },
        {
            from: 'index-owner-template.html',
            to: 'web/index-owner-template.html'
        },
        {
            from: 'article-detail-template.html',
            to: 'web/article-detail-template.html'
        },
        {
            // 相对于当前文件夹
            from: 'header.tpl',
            // 相对于 cellar
            to: 'web/src/components/header/header.tpl'
        }
    ]
};

module.exports = config;