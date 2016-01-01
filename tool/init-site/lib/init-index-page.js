/**
 * 初始化页面
 *
 * Created by zhaoxiaoqiang on 15/10/19.
 */

var fs = require('fs');
var config = require('./config.js');
var ejs = require('ejs');

function initPage(articleArr) {
    // 主人首页
    var indexOwnerPageTemplatePath = config.rootPath + config.indexOwnerPageTemplatePath;
    var indexOwnerTemplate = fs.readFileSync(indexOwnerPageTemplatePath, config.encoding);
    var indexOwnerHtml = ejs.render(
        indexOwnerTemplate,
        {
            articleArr: articleArr,
            siteData: config.siteData
        }
    );
    var indexOwnerPagePath = config.rootPath + config.indexOwnerPagePath;
    fs.writeFileSync(indexOwnerPagePath, indexOwnerHtml, config.encoding);

    // 首页
    var indexPageTemplatePath = config.rootPath + config.indexPageTemplatePath;
    var indexTemplate = fs.readFileSync(indexPageTemplatePath, config.encoding);
    var indexHtml = ejs.render(
        indexTemplate,
        {
            articleArr: articleArr,
            siteData: config.siteData
        }
    );
    var indexPagePath = config.rootPath + config.indexPagePath;
    fs.writeFileSync(indexPagePath, indexHtml, config.encoding);
}

module.exports = initPage;