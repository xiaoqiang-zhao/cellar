var path = require('path');
module.exports = {
    entry: {
        main: '../web/src/components/main/main.js'
    },

    output: {
        path: '../web/dist/',
        publicPath: '/js/',
        filename: '[name].js'
    },

    resolve: {
        alias: {
            vue: path.join(__dirname, '../web/src/dep/vue.js')
        }
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
