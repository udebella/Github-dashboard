const webpackConfig = require(`./webpack.test`)
const helpers = require(`./helpers`)

module.exports = (config) => {
    config.set({
        basePath: `../`,
        frameworks: [`mocha`, `chai`],
        files: [
            helpers.absolutePath(`/src/test.spec.js`),
        ],
        preprocessors: {
            'src/test.spec.js': [`webpack`],
        },
        webpack: webpackConfig,
        webpackServer: {noInfo: true},
        reporters: [`mocha`, `coverage-istanbul`],
        coverageIstanbulReporter: {
            reports: [ `html`, `text-summary` ],
            dir: `coverage`,
            fixWebpackSourcePaths: true,
        },
        port: 9876,
        colors: true,
        browsers: [`FirefoxHeadless`],
        customLaunchers: {
            FirefoxHeadless: {
                base: `Firefox`,
                flags: [`-headless`],
            },
        },
        singleRun: !helpers.hasCommandLineArgument(`watch`),
    })
}