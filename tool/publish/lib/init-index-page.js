/**
 * 初始化页面
 *
 * Created by zhaoxiaoqiang on 15/10/19.
 */

var fs = require('fs');
var config = require('./config.js');
var ejs = require('ejs');
// 当和 init-site 集成使用时需要重置配置
ejs.open = '<%';
ejs.close = '%>';

function initPage(articleArr) {
    // 主人首页
    var indexOwnerPageTemplatePath = config.rootPath + config.indexOwnerPageTemplatePath;
    var indexOwnerTemplate = fs.readFileSync(indexOwnerPageTemplatePath, config.encoding);
    var indexOwnerHtml = ejs.render(
        indexOwnerTemplate,
        {
            articleArr: articleArr
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
            articleArr: articleArr
        }
    );
    var indexPagePath = config.rootPath + config.indexPagePath;
    fs.writeFileSync(indexPagePath, indexHtml, config.encoding);
}

module.exports = initPage;