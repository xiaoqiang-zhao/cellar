/**
 * 复制博客资源到博客的独立文件加载
 *
 * Created by zhaoxiaoqiang on 15/10/27.
 */
var fs = require('fs');
var config = require('./config.js');
var gulp = require('gulp');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

var rootPath = config.rootPath;
var publicSitePath = rootPath + config.publicSitePath;

/**
 * 复制公开的文章详情页
 *
 * @param {Array} articleArr 文章列表
 */
function publishCopy (articleArr) {
    var articlesFolderPath = publicSitePath + config.articlesPath + '/';

    // 复制首页
    gulp.src([rootPath + '/index.html'])
        .pipe(gulp.dest(publicSitePath + '/'));
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
        .pipe(rename('articles.json'))
        .pipe(gulp.dest(publicSitePath + '/articles/'));

    console.log('公开文章复制完成        ');
}

/**
 * 复制初始化网站时需要的文件
 *
 * @param {string} version 博客功能模块的版本号
 */
function copyInitSiteFile (version) {
    // 复制 favicon.ico 图标
    gulp.src([rootPath + '/favicon.ico'])
        .pipe(gulp.dest(publicSitePath + '/'));
    console.log('favicon.ico 图标复制完成         ');

    // 清理压缩版 js
    gulp.src([publicSitePath + '/dist/*'], {read: false}) // read: false 可加快速度
        .pipe(clean({force: true})); // force: true 配置此项可删除非当前目录下的文件

    // 复制压缩后的 js 资源文件
    gulp.src([rootPath + '/dist/' + version + '.js'])
        .pipe(gulp.dest(publicSitePath + '/dist/'));
}
module.exports = {
    copyInitSiteFile: copyInitSiteFile,
    copyAboutArticlesFile: publishCopy
};