# Gulp
 
> 我也来学学这个新玩意。

## 环境

全局安装(只有全局安装的包才可以直接使用命令行)：

    $ npm install --global gulp

然后添加文件 `gulpfile.js`，在此文件所在的文件夹下运行命令 `gulp`，截图如下：

![image](img/1.jpg) 
    
局部安装

    $ npm install gulp

如果只局部安装，通过下面命令也可以运行，原理参见另一篇文章[npm](../npm/main.html)。

    ./node_modules/gulp/bin/gulp.js

还需要安装各种插件，这样普通的合并压缩任务才能进行

    npm install gulp-minify-css gulp-uglify gulp-concat gulp-rename gulp-jshint --save-dev

## API
 
只有四个方法，详细解释参见[gulp API](http://www.gulpjs.com.cn/docs/api/)：

- src 获取要处理的文件    
- dest 定义处理后的输出路径
- task 定义处理方式
- watch 监听文件
   
src的一些技巧：
    
    // 直接用字符串指定文件匹配规则
    gulp.src('css/*.css')
    // 用数组指定
    gulp.src(['css/*.css', 'css/img/**'])
    // 不包括的写法，文件名不是 “import”的css文件
    src(['css/!(import)*.css'])

另外上面的参照路径是命令的启动路径而非文件所在路径。

## 作为命令行工具
    
gulpfile.js 文件中的default任务在没有参数的时候被调用，一般会在default中以 `gulp.start` 的方式调用全部任务。也可以在命令行单独执行某个任务，如 `gulp MinCSS`。

    // 任务入口
    gulp.task('default', function() {
        console.log('default任务开始');
        gulp.start(['MinCSS']);
    });
    
    // 合并压缩CSS
    gulp.task('MinCSS', function () {
        // 处理任务的代码
    });

gulp的任务都是异步执行的，如果一个任务依赖另一个，需要配置依赖。下面是官网上的例子：

    var gulp = require('gulp');
    
    // 返回一个 callback，因此系统可以知道它什么时候完成
    gulp.task('one', function(cb) {
        // 做一些事 -- 异步的或者其他的
        cb(err); // 如果 err 不是 null 或 undefined，则会停止执行，且注意，这样代表执行失败了
    });
    
    // 定义一个所依赖的 task 必须在这个 task 执行之前完成
    gulp.task('two', ['one'], function() {
        // 'one' 完成后
    });
    
    gulp.task('default', ['one', 'two']);

## 作为node的模块

将task这层壳去掉就是node的模块了，将下面的内容在 `node-gulp.js` 中，
    
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

使用node调用，和下面的 “纯css按文件顺序合并压缩” 效果相同，调用方式如下：

    node node-gulp
    
## 实例

在 [github](https://github.com/longze/cellar/tree/master/web/articles/gulp-research) 上可以找到相关Demo。

### 纯css按文件顺序合并压缩

    var gulp = require('gulp');
    var minifycss = require('gulp-minify-css');
    var concat = require('gulp-concat');
    var rename = require('gulp-rename');
    
    gulp.task('default', ['MinCSS']);
    
    // 合并压缩CSS-1
    gulp.task('MinCSS', function () {
        var outPutFolder = 'asset/css';
        gulp.src('css-1/*.css')
            .pipe(concat('all.css'))
            .pipe(gulp.dest(outPutFolder))
            .pipe(minifycss())
            .pipe(rename('all-min.css'))
            .pipe(gulp.dest(outPutFolder));
    });

### 通过import文件合并压缩

    @import url(a.css);
    @import url(b.css);

一些项目会把所有的css通过一个import.css文件包含进去(像上面那样)，方便页面引用和某些打包工具。通过下面的方式直接对import.css进行压缩，会自动引入其他文件，还可以保证css的顺序。    

    // 合并压缩CSS-2
    gulp.task('MinCSS', function () {
        var outPutFolder = 'asset/css';
        gulp.src('css-2/import.css')
            .pipe(minifycss())
            .pipe(rename('all-min.css'))
            .pipe(gulp.dest(outPutFolder));
    });

上面的方法有一个弊端，就是没有生成拼接不压缩的文件。通过文件排除技巧可以得到拼接不压缩的文件，但是拼接顺序是文件的排列顺序。

    gulp.task('MinCSS', function () {
        var outPutFolder = 'asset/css';
        gulp.src(['css-2/!(import)*.css'])
            .pipe(concat('all.css'))
            .pipe(gulp.dest(outPutFolder));
    });

### css中的图片合并 - sprite

可以把CSS中的小图片合并成一张大图，提高网页的加载速度，关键代码示例如下：

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
        
压缩出的样式如下所示：

    .icon-1{background:url(img/sprite-1446802598452.png)}
    .icon-2{background:url(img/sprite-1446802598452.png) -13px 0}
    
雪碧图的压缩不适合处理背景重复的样式，图片拼装后图片间相互干扰，所以写样式的时候需要将背景图装在一个只盛放背景图的容器中。如果有部分背景图不需要压缩可以抽取到单独的样式文件中，压缩背景图时排出此文件，也可以采用变通的方式 -- 直接使用图片元素。

### 压缩松散的js

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

### 压缩AMD模块化代码 

使用 gulp-amd-optimizer 这个插件,这个插件只能把某个或某些个文件夹下的AMD模块js倒腾在一起(做了依赖的排序),不能设置入口文件,适合all in one 的打包方式.下面是示例代码和插件地址

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

[gulp-amd-optimizer](https://www.npmjs.com/package/gulp-amd-optimizer)

没有找到分块打包的办法,如果各分块之间按文件夹天然隔离可以多用几个任务配置不同的js文件筛选规则来解决这个问题,如果分块之间有交集建议采用RequireJs的官方打包工具r.js进行打包.

## 感慨

前端的技术更新太快了,从 前年的 grunt 到去年的 gulp,眼看 gulp 也要过时了,webpack 已经兴起.真是无奈,在写这篇学习笔记的时候发现这个技术竟然有些更不上时代了,期待下一篇 webpack 吧...

## 参考资料
    
[gulp API](http://www.gulpjs.com.cn/docs/api/)

[gulp入门指南](http://www.open-open.com/lib/view/open1417068223049.html)

[gulp教程之gulp-imagemin](http://www.ydcss.com/archives/26)

[gulp-css-spriter 官网](https://www.npmjs.com/package/gulp-css-spriter)

[gulp-css-spriter](http://www.codes51.com/article/detail_117947.html)

[gulp-amd-optimizer](https://www.npmjs.com/package/gulp-amd-optimizer)