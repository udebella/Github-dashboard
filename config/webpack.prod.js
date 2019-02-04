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
	optimization: {
		splitChunks: {
			maxInitialRequests: 4,
			cacheGroups: {
				vue: {
					test: /[\\/]node_modules\/.*(vue).*[\\/]/,
					name: 'vue',
					chunks: 'all',
					priority: 20,
				},
				fontawesome: {
					test: /[\\/]node_modules\/@fortawesome[\\/]/,
					name: 'fontawesome',
					chunks: 'all',
					priority: 20,
				},
				others: {
					test: /[\\/]node_modules[\\/]/,
					name: 'others',
					chunks: 'all',
					priority: 10,
				},
			},
		},
	},
	mode: 'production',
}

module.exports = config
