/**
 * 将文章列表数据写入 json 文件
 *
 * Created by zhaoxiaoqiang on 15/12/23.
 */

var fs = require('fs');
var config = require('./config.js');

function writeArticleListInJsonFile(articleArr) {
    var articleList = [];
    var publishedArticleList = [];
    articleArr.forEach(function (item) {
        var jsonData =  item.jsonData;
        jsonData.enName = item.enName;
        if (item.jsonData.isPublished) {
            publishedArticleList.push(jsonData);
        }
        articleList.push(jsonData);
    });

    // 全部文章
    var str = JSON.stringify(articleList, null, 2);
    var path = config.rootPath + config.articlesPath + '/articles.json';
    fs.writeFileSync(path, str, config.encoding);

    // 公开的文章
    str = JSON.stringify(publishedArticleList, null, 2);
    path = config.rootPath + config.articlesPath + '/published-articles.json';
    fs.writeFileSync(path, str, config.encoding);
}

module.exports = writeArticleListInJsonFile;