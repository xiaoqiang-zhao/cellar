/**
 * Created by zhaoxiaoqiang on 15/10/13.
 *
 * 初始化网站(遗漏或更改后可以二次初始化)
 */

var fs = require('fs');
var ejs = require('ejs');
ejs.open = '{{';
ejs.close = '}}';
var config = require('./config.js');
var libPath = __dirname + '/';
// 根路径
rootPath = libPath.replace('tool/init-site/lib/', '');

// 初始化网站全局部分
var encoding = config.encoding;
var versionMapPath = libPath + 'version-map.json';
var versionMap = JSON.parse(fs.readFileSync(versionMapPath, encoding));
var lastVersion = versionMap[versionMap.length - 1];
config.siteData.version = lastVersion.version;
config.templates.forEach(function (item) {
    renderTemplateAndCopy(item);
});

function renderTemplateAndCopy(item) {
    var fromPath = libPath + item.from;
    var toPath = rootPath + item.to;
    var template = fs.readFileSync(fromPath, encoding);
    var content = ejs.render(
        template,
        config.siteData
    );
    fs.writeFileSync(toPath, content, encoding);
}
console.log('-------- init-site  --------');
console.log('模板初始化完成             ');
console.log('资源压缩中...             ');
// 压缩
var webpack = require('webpack');
var webpackConfig = {
    entry: {
        main: rootPath + 'web/src/components/main/main.js'
    },
    optimize: {
        // 是否压缩
        minimize: true
    },
    resolve: {
        alias: {
            vue: rootPath +  '/web/src/dep/vue.js'
        }
    },
    output: {
        path: rootPath + '/web/dist/',
        filename: '[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.tpl$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            }
        ]
    }
};
var isDebug = process.argv[2] === '-d';
if (isDebug) {
    webpackConfig.devtool = 'sourcemap';
    webpackConfig.optimize = {
        // 是否压缩
        minimize: false
    };
    webpackConfig.output.filename = 'debug.js';
    webpackConfig.output.sourceMapFilename = 'debug.map';
}
webpack(webpackConfig, function (err, stats) {
    if (err) {
        throw new gutil.PluginError("webpack", err);
    }

    if (isDebug === true) {
        console.log('debug 文件准备完成             ');
        lastVersion.version = 'debug';
    }
    else {
        var hash = stats.hash;
        var distPath = rootPath + 'web/dist/';

        // 有新版，自动更新
        if (lastVersion.hash !== hash) {
            var date = new Date();
            var arr = lastVersion.version.split('.');
            arr[arr.length - 1] = parseInt(arr[arr.length - 1]) + 1;
            var version = arr.join('.');
            lastVersion = {
                version: version,
                hash: hash,
                time: (new Date).getTime(),
                timeStr: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getUTCDate(),
            };

            // 回写 version-map.json
            versionMap.push(lastVersion);
            var versionMapStr = JSON.stringify(versionMap, null, 2);
            fs.writeFile(versionMapPath, versionMapStr, config.encoding);

            // 重命名压缩后的资源文件
            fs.rename(distPath + hash + '.js', distPath + version + '.js');
        }
        else {
            // 删除压缩后的资源文件(用 hash 命名的那一个)
            fs.unlink(distPath + hash + '.js');
        }
        // 暂不提供大版本更新，可手动修改 version-map.json 和 dist 下对应的 js 压缩包
        console.log('资源压缩完成             ');
    }

    config.siteData.version = lastVersion.version;
    renderTemplateAndCopy(config.templates[0]);
    console.log('网站整体初始化完成，版本：' + lastVersion.version + '               ');
    // 自动发布
    require('../../publish');
});
