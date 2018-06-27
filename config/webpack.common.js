const {absolutePath} = require('./helpers')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const commonConfig = {
    resolve: {
        extensions: ['.js'],
    },
    entry: absolutePath('/src/main.js'),
    output: {
        path: absolutePath('/dist'),
        filename: '[name].js',
    },
    module: {
        rules: [],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: absolutePath('/src/index.html')
        })
    ]
}

module.exports = commonConfig