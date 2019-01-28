const {absolutePath} = require('./helpers')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const commonConfig = require('./webpack.common')

const config = {
	...commonConfig,
	plugins: [
		...commonConfig.plugins,
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			generateStatsFile: true,
			openAnalyzer: false,
			reportFilename: absolutePath('/bundle-analyzer/index.html'),
		}),
	],
	mode: 'production',
}

module.exports = config
