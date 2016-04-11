var webpack = require('webpack');
var pkg = require('./package.json');

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
        }),
        new webpack.BannerPlugin([
            pkg.name + ' v' + pkg.version + ' (' + pkg.homepage + ')',
            'Copyright ' + new Date().getFullYear(),
            'Licensed under the  '+ pkg.license +' license'
        ].join('\n'))
    ]
};