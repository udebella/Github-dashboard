const helpers = require(`./helpers`)
const {SourceMapDevToolPlugin} = require(`webpack`)
const webpackConfig = require(`./webpack.common`)

const testConfig = {
    ...webpackConfig,
    entry: helpers.absolutePath(`/src/test.spec.js`),
    module: {
        rules: [
            ...webpackConfig.module.rules,
            {
                test: /\.js$/,
                loader: `istanbul-instrumenter-loader`,
                exclude: [
                    /node_modules/,
                    /\.spec\.js$/,
                ],
                query: {
                    esModules: true,
                },
            },
        ],
    },
    plugins: [
        ...webpackConfig.plugins,
        new SourceMapDevToolPlugin({
            filename: null, // if no value is provided the sourcemap is inlined
            test: /\.(js)($|\?)/i,
        }),
    ],
    devtool: `inline-source-map`,
    mode: `development`,
}

module.exports = testConfig