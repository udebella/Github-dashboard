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
                test: /\.(js|vue)$/,
                enforce: 'pre',
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    fix: true,
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.scss$/,
                loader: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: absolutePath('/src/index.html'),
        }),
    ],
}

module.exports = commonConfig