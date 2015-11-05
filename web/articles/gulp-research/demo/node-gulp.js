/**
 * Created by zhaoxiaoqiang on 15/11/5.
 */
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var outPutFolder = 'asset/css';
gulp.src('css-1/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest(outPutFolder))
    .pipe(minifycss())
    .pipe(rename('all-min.css'))
    .pipe(gulp.dest(outPutFolder));