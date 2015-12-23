var htmlLoader = require('html-loader');
module.exports = {
    entry: {
        main: '../web/src/main.js'
    },

    output: {
        path: '../web/dist/',
        publicPath: '/js/',
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.tpl$/,
                loader: 'html-loader'
            }
        ]
    }
};
