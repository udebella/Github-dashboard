const {absolutePath} = require("./helpers")

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
}

module.exports = commonConfig