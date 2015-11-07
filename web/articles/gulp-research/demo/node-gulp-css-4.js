/**
 * Created by zhaoxiaoqiang on 15/11/5.
 */
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var spriter = require('gulp-css-spriter');
var notify = require('gulp-notify');

var timestamp = +new Date();
gulp.src('./css-4/*.css')
    .pipe(spriter({
        // 生成的spriter的位置
        'spriteSheet': './asset/img/sprite-' + timestamp + '.png',
        // 生成样式文件图片引用地址的路径
        'pathToSpriteSheetFromCSS': 'img/sprite-' + timestamp + '.png'
    }))
    .pipe(minifycss())
    .pipe(rename('min.css'))
    .pipe(gulp.dest('./asset'));