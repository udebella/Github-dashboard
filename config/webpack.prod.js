const {absolutePath} = require('./helpers')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const commonConfig = require('./webpack.common')

const config = {
	...commonConfig,
	plugins: [
		...commonConfig.plugins,
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer: false,
			reportFilename: absolutePath('/bundle-analyzer/index.html'),
		}),
	],
	mode: 'production',
	devtool: 'source-map',
}

module.exports = config
