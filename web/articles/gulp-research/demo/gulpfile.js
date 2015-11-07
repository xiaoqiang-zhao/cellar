var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

// 任务入口
//gulp.task('default', function() {
//    console.log('default任务开始');
//    gulp.start(['MinCSS']);
//});

gulp.task('default', ['MinCSS']);

// 合并压缩CSS-1
//gulp.task('MinCSS', function () {
//    var outPutFolder = 'asset/css';
//    gulp.src('css-1/*.css')
//        .pipe(concat('all.css'))
//        .pipe(gulp.dest(outPutFolder))
//        .pipe(minifycss())
//        .pipe(rename('all-min.css'))
//        .pipe(gulp.dest(outPutFolder));
//});

// 合并压缩CSS-2
gulp.task('MinCSS', function () {
    var outPutFolder = 'asset/css';
    gulp.src('css-2/import.css')
        .pipe(minifycss())
        .pipe(rename('all-min.css'))
        .pipe(gulp.dest(outPutFolder));
});

//gulp.task('MinCSS', function () {
//    var outPutFolder = 'asset/css';
//    gulp.src(['css-2/!(import)*.css'])
//        .pipe(concat('all.css'))
//        .pipe(gulp.dest(outPutFolder));
//});