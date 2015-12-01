/**
 * 复制首页
 * Created by zhaoxiaoqiang on 15/11/7.
 */

var fs = require('fs');
var config = require('./config.js');

/**
 * 复制首页
 */
function copyIndexPage() {
    var htmlFilePath = config.rootPath + config.indexPagePath;
    var htmlContent = fs.readFileSync(htmlFilePath, config.encoding);
    // 直接覆写文件
    var targetPath = config.rootPath + config.publicSitePath + config.indexPagePath;
    fs.writeFileSync(targetPath, htmlContent, config.encoding);
    console.log('首页复制完成       ');
}

module.exports = copyIndexPage;