/**
 * 复制可公开的文章到项目中
 *
 * Created by zhaoxiaoqiang on 15/10/27.
 */
var fs = require('fs');
var config = require('./config.js');
var gulp = require('gulp');

/**
 * 复制公开的文章详情页
 *
 * @param {Array} articleArr 文章列表
 */
function publishCopy (articleArr) {
    var rootPath = config.rootPath;
    var publicSitePath = config.publicSitePath;
    var articlesFolderPath = rootPath + publicSitePath + config.articlesPath + '/';

    // 复制首页
    gulp.src([rootPath + '/index.html'])
        .pipe(gulp.dest(rootPath + publicSitePath + '/'));
    console.log('首页复制完成       ');

    articleArr.forEach(function (article) {

        // 可公开的文章
        if (article.jsonData.isPublished === true) {
            var htmlFilePath = article.folderPath + '/' + config.htmlFileFilename;
            var mdFilePath = article.folderPath + '/' + config.mdFileFilename;
            // 直接覆写文件，内容全部由md文档生成不容许修改
            var targetPath = articlesFolderPath + article.enName;
            // 复制 md 文档 和 html
            gulp.src([htmlFilePath, mdFilePath])
                .pipe(gulp.dest(targetPath + '/'));
            // 复制文章引用的图片
            gulp.src([article.folderPath + '/img/*'])
                .pipe(gulp.dest(targetPath + '/img/'));
            // 复制 demo
            gulp.src([article.folderPath + '/demo/**'])
                .pipe(gulp.dest(targetPath + '/demo/'));
        }
    });

    // 复制已发布文章的json数据
    gulp.src([rootPath + '/articles/published-articles.json'])
        .pipe(gulp.dest(rootPath + publicSitePath + '/articles/'));
    // 复制压缩后的 js 资源文件
    gulp.src([rootPath + '/dist/*.js'])
        .pipe(gulp.dest(rootPath + publicSitePath + '/dist/'));

    console.log('公开文章复制完成        ');
}

module.exports = publishCopy;