/**
 * gulp 配置文件
 * Created by zhaoxiaoqiang on 15/10/27.
 */

var gulp = require('gulp');

// 提取文件
gulp.src('../web/src/css/*')
    // 复制文件
    .pipe(gulp.dest('../../longze/src/css'));