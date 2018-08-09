const {BundleAnalyzerPlugin} = require(`webpack-bundle-analyzer`)
const commonConfig = require(`./webpack.common`)

const config = {
	...commonConfig,
	plugins: [
		...commonConfig.plugins,
		new BundleAnalyzerPlugin(),
	],
	mode: `production`,
}

module.exports = config
