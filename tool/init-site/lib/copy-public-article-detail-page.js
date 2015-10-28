/**
 * 复制可公开的文章到项目中
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

        var articleDetailPageHtml = ejs.render(articleDetailTemplateStr, {
            title: article.jsonData.title,
            content: htmlContent
        });
        // 可公开的文章
        if (article.jsonData.public === true) {
            var htmlFilePath = article.folderPath + '/main.html';
            var htmlContent = fs.readFileSync(htmlFilePath, config.encoding);
            // 直接覆写文件，内容全部由md文档生成不容许修改
            var targetPath = config.rootPath + config.publicSitePath + '/articles/' + article.enName;
            console.log(targetPath);
            debugger;
            // 目录不存在
            if (!fs.existsSync(targetPath)) {
                fs.mkdirSync(targetPath);
            }
            fs.writeFileSync(targetPath + '/main.html', htmlContent, config.encoding);
        }
    });

    console.log('公开文章复制完成');
}

module.exports = initArticleDetail;