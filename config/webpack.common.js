const {absolutePath} = require('./helpers')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

const commonConfig = {
    resolve: {
        extensions: ['.js', '.vue', '.css'],
    },
    entry: absolutePath('/src/main.js'),
    output: {
        pathinfo: true,
        path: absolutePath('/dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                loader: [
                    'style-loader',
                    'css-loader',
                ]
            }
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: absolutePath('/src/index.html')
        }),
    ]
}

module.exports = commonConfig