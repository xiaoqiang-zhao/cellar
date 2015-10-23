/**
 * 获取文章的路径数组(本地绝对路径)
 *
 * Created by zhaoxiaoqiang on 15/10/14.
 */

var fs = require('fs');

/**
 * 获取文章的路径数组(本地绝对路径)
 * @param {Object} config 配置对象
 *
 * @return {Array} articleArr 文件夹路径列表
 */
function getArticlesList (config) {
    var articleArr = [];
    var root = config.rootPath + config.articlesPath;

    if (isExistFolder(root)) {
        var files = fs.readdirSync(root);

        files.forEach(function (file) {
            var folderPath = root + '/'+ file;
            if (isExistFolder(folderPath)) {
                articleArr.push({
                    folderPath: folderPath,
                    detailFilePath: folderPath + '/main.html',
                    detailPagePath: '/articles/' + file + '/main.html',
                    enName: file
                });
            }
        });
    }

    return articleArr;
}

/**
 * 判断文件夹是否存在
 *
 * @param {String} filePath 文件夹路径
 * @returns {boolean} result 是否存在此文件夹
 */
function isExistFolder (filePath) {
    var result = false;

    if (fs.existsSync(filePath)) {//文件或文件夹存在
        var stat = fs.lstatSync(filePath); // 对于不存在的文件或文件夹，此函数会报错

        if (stat.isDirectory()) {// 文件夹
            result = true;
        }
    }

    return result;
}

module.exports = getArticlesList;