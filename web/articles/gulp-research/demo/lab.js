/**
 * Created by zhaoxiaoqiang on 15/11/5.
 */
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var notify = require('gulp-notify');

var outPutFolder = 'asset/css';
gulp.src('css-2/!(import)*.css')
    .pipe(gulp.dest(outPutFolder));
