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