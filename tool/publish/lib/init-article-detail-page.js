/**
 * 初始化每篇文章的详情页和数据片段
 * (采用同步处理，因为后续操作需要依赖此结果)
 *
 * Created by zhaoxiaoqiang on 15/10/23.
 */
var fs = require('fs');
var ejs = require('ejs');
// 当和 init-site 集成使用时需要重置配置
ejs.open = '<%';
ejs.close = '%>';
var config = require('./config.js');
var markdownTool = require('./markdown-tool.js');
/**
 * 初始化每篇文章的详情页和数据片段
 * (采用同步处理)
 *
 * @param {Array} articleArr 文章列表
 */
function initArticleDetail (articleArr) {
    var articleDetailTemplatePath = config.rootPath + config.articleDetailPageTemplatePath;
    var articleDetailTemplateStr = fs.readFileSync(articleDetailTemplatePath, config.encoding);

    articleArr.forEach(function (article) {
        var mdFilePath = article.folderPath + '/' + config.mdFileFilename;
        var mdContent = fs.readFileSync(mdFilePath, config.encoding);
        var markedData = markdownTool.mark(mdContent);

        var articleDetailPageHtml = ejs.render(articleDetailTemplateStr, {
            title: article.jsonData.title,
            content: markedData.htmlContent,
            headerTree: markedData.headerTree[0]
        });
        var articleDetailFilePath = article.detailFilePath;

        // 直接覆写文件，内容全部由md文档生成不容许修改
        fs.writeFileSync(articleDetailFilePath, articleDetailPageHtml, config.encoding);
    });

    console.log('文章详情初始化完成         ');
}

module.exports = initArticleDetail;