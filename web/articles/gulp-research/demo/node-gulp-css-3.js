/**
 * Created by zhaoxiaoqiang on 15/11/5.
 */
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
// var clean = require('gulp-clean');

var outPutFolder = 'asset/css';
//gulp.src('css-3/*/*.css')
//    .pipe(concat('all.css'))
//    .pipe(gulp.dest(outPutFolder))
//    .pipe(minifycss())
//    .pipe(rename('all-min.css'))
//    .pipe(gulp.dest(outPutFolder));

// dist/assets

gulp.src('css-3/**/**/*')
    .pipe(imagemin({
        optimizationLevel: 1
    }))
    .pipe(gulp.dest(outPutFolder))
    .pipe(notify({message: 'Images task complete'}));
