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
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    }
};