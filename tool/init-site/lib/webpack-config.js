/**
 * Created by zhaoxiaoqiang on 16/2/3.
 */

var libPath = __dirname + '/';
var rootPath = libPath.replace('tool/init-site/lib/', '');

var webpackConfig = {
    entry: {
        main: rootPath + 'web/src/components/main/main.js'
    },
    resolve: {
        alias: {
            vue: rootPath + '/web/src/dep/vue.js',
            vueRouter: rootPath + '/web/src/dep/vue-router.js',
            jQuery: rootPath + '/web/src/dep/jquery-2.1.4.js'
        }
    },
    optimize: {
        // 是否压缩
        minimize: true // UglifyJsPlugin
    },
    output: {
        path: rootPath + '/web/dist/',
        filename: '[hash].js'
    },
    module: {
        loaders: [
            //{
            //    test: /\.js$/,
            //    loader: 'babel-loader' //?stage=1
            //    ,exclude: /(dep)|(dist)/
            //},
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

module.exports = webpackConfig;