/**
 * 复制可公开的文章到项目中
 *
 * Created by zhaoxiaoqiang on 15/10/27.
 */
var fs = require('fs');
var ejs = require('ejs');
var config = require('./config.js');
var marked = require('./marked.js');

/**
 * 复制公开的文章详情页
 *
 * @param {Array} articleArr 文章列表
 */
function copyPublicArticleDetailPage (articleArr) {

    articleArr.forEach(function (article) {

        // 可公开的文章
        if (article.jsonData.public === true) {
            var htmlFilePath = article.folderPath + '/' + config.htmlFileFilename;
            var htmlContent = fs.readFileSync(htmlFilePath, config.encoding);
            // 直接覆写文件，内容全部由md文档生成不容许修改
            var targetPath = config.rootPath + config.publicSitePath + config.articlesPath + '/' + article.enName;
            // 目录不存在
            if (!fs.existsSync(targetPath)) {
                fs.mkdirSync(targetPath);
            }
            fs.writeFileSync(targetPath + '/' + config.htmlFileFilename, htmlContent, config.encoding);
        }
    });

    console.log('公开文章复制完成');
}

module.exports = copyPublicArticleDetailPage;