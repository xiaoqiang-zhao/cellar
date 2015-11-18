module.exports = {
    entry: {
        main: './1-base/a.js'
    },

    output: {
        path: './dist/js/',
        publicPath: '/js/',
        filename: '[name].js'
    },

    plugins: [

    ],

    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['web_modules', 'node_modules', 'node_modules/VueFrame']
    },

    module: {
        loaders: [
            {test: /\.html$/, loader: 'html'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'}
        ]
    }
};
