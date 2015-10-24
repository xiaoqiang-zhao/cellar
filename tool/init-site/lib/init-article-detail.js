/**
 * 初始化每篇文章的详情页和数据片段
 * (采用同步处理，因为后续操作需要依赖此结果)
 *
 * Created by zhaoxiaoqiang on 15/10/23.
 */
var fs = require('fs');
var ejs = require('ejs');
var config = require('./config.js');
var marked = require('./marked.js');

/**
 * 初始化每篇文章的详情页和数据片段
 * (采用同步处理)
 *
 * @param {Array} articleArr 文章列表
 */
function initArticleDetail (articleArr) {
    var articleDetailTemplatePath = config.rootPath + '/article-detail-template.html';
    var articleDetailTemplateStr = fs.readFileSync(articleDetailTemplatePath, config.encoding);
    var articleDetailTemplate = ejs.compile(articleDetailTemplateStr);

    articleArr.forEach(function (article) {
        var mdFilePath = article.folderPath + '/main.md';
        var mdContent = fs.readFileSync(mdFilePath, config.encoding);
        var htmlContent = marked(mdContent);
        //var articleDetailPageHtml = articleDetailTemplate.render({
        //    content: htmlContent
        //});

        var articleDetailPageHtml = ejs.render(articleDetailTemplateStr, {
            content: htmlContent
        });

        var articleDetailFilePath = article.detailFilePath;

        // 直接覆写文件，内容全部由md文档生成不容许修改
        fs.writeFileSync(articleDetailFilePath, articleDetailPageHtml, config.encoding);
    });

    console.log('文章详情初始化完成');
}

module.exports = initArticleDetail;