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
            // 相对于当前文件夹
            from: 'index-template.html',
            // 相对于 cellar
            to: 'web/index-template.html'
        },
        {
            from: 'article-detail-template.html',
            to: 'web/article-detail-template.html'
        },
        {
            from: 'header.tpl',
            to: 'web/src/components/header/header.tpl',
            // 在文件前面添加一些东西，比如下面的注释
            before: '<!-- 博客头部，如果需要修改此文件，请修改对应的模板文件 tool/init-site/lib/header.tpl  -->\n'
        }
    ]
};

module.exports = config;