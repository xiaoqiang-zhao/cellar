/**
 * 初始化页面
 *
 * Created by zhaoxiaoqiang on 15/10/19.
 */

var fs = require('fs');
var config = require('./config.js');
var ejs = require('ejs');

function initPage(articleArr) {
    var indexOwnerTemplate = fs.readFileSync(config.rootPath + '/index-owner-template.html', config.encoding);
    var indexOwnerHtml = ejs.render(
        indexOwnerTemplate,
        {
            articleArr: articleArr
        }
    );
    fs.writeFileSync(config.rootPath + '/index-owner.html', indexOwnerHtml, config.encoding);
    var indexTemplate = fs.readFileSync(config.rootPath + '/index-template.html', config.encoding);
    var indexHtml = ejs.render(
        indexTemplate,
        {
            articleArr: articleArr
        }
    );
    fs.writeFileSync(config.rootPath + '/index.html', indexHtml, config.encoding);
}

module.exports = initPage;