const {HotModuleReplacementPlugin, NamedModulesPlugin} = require(`webpack`)
const {BundleAnalyzerPlugin} = require(`webpack-bundle-analyzer`)
const commonConfig = require(`./webpack.common`)

const config = {
	...commonConfig,
	mode: `development`,
	devServer: {
		clientLogLevel: `warning`,
		// contentBase: './dist',
		port: 3000,
		hot: true,
		open: true,
		proxy: {
			'/graphql': {
				target: `https://api.github.com/`,
				secure: false,
				changeOrigin: true,
			},
		},
	},
	plugins: [
		...commonConfig.plugins,
		new HotModuleReplacementPlugin(),
		new NamedModulesPlugin(),
		new BundleAnalyzerPlugin(),
	],
}

module.exports = config
