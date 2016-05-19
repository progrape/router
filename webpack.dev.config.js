var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src/example'),
    entry: {
        js: './app.js'
    },
    output: {
        path: path.join(__dirname, 'dist/example'),
        filename: 'example.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }, {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: 'style!css!postcss!less'
            }, {
                test: /\.png/,
                exclude: /node_modules/,
                loader: 'file'
            }
        ]
    },
    postcss: [autoprefixer],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/example/index.html')
        }),
        new OpenBrowserPlugin({url: 'http://localhost:8080'})
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
};