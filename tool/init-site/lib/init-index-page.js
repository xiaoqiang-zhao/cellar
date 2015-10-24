/**
 * 初始化页面
 *
 * Created by zhaoxiaoqiang on 15/10/19.
 */

var fs = require('fs');
var config = require('./config.js');
var ejs = require('ejs');

function initPage(articleArr) {
    var template = fs.readFileSync(config.rootPath + '/index-owner-template.html', config.encoding);
    var html = ejs.render(
        template,
        {
            articleArr: articleArr
        }
    );
    fs.writeFileSync(config.rootPath + '/index-owner.html', html, config.encoding);
}

module.exports = initPage;