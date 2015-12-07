var css = require("css-loader");
module.exports = {
    entry: {
        main: './a.js'
    },

    output: {
        path: './dist/',
        publicPath: '/js/',
        filename: '[name].js'
    },

    module: {
        loaders: [
            { test: /\.css$/, loader: "css-loader?sourceMap" }
        ]
    }
};