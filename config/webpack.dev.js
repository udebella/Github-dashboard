const commonConfig = require('./webpack.common')

const config = {
    ...commonConfig,
    mode: 'development',
    devServer: {
        contentBase: './dist',
        port: 3000,
        hot: true,
        open: true,
    }
}

module.exports = config