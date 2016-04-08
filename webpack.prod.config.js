var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: './dist',
        filename: 'router.min.js',
        library: 'Router',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};