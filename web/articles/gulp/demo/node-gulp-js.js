/**
 * Created by zhaoxiaoqiang on 15/11/10.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.src('./js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./asset'))
    .pipe(uglify())
    .pipe(rename('min.js'))
    .pipe(gulp.dest('./asset'));