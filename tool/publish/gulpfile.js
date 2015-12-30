/**
 * gulp 配置文件
 * Created by zhaoxiaoqiang on 15/10/27.
 */

var gulp = require('gulp');

// 提取文件
gulp.src(['../../web/articles/array/main.md', '../../web/articles/array/demo/*'])
    // 复制文件
    .pipe(gulp.dest('../../../longze/articles/'));