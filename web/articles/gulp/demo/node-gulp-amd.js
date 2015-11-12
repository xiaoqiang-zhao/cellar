/**
 * Created by zhaoxiaoqiang on 15/11/10.
 */
var gulp = require('gulp');
var amdOptimize = require('gulp-amd-optimizer');
var concat = require('gulp-concat-sourcemap');

var requireConfig = {
    baseUrl: './'
};
var options = {
    umd: false
};

gulp.src('js-amd/*.js', {base: requireConfig.baseUrl})
    .pipe(amdOptimize(requireConfig, options))
    .pipe(concat('modules.js'))
    .pipe(gulp.dest('asset'));
