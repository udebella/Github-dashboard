const {HotModuleReplacementPlugin, NamedModulesPlugin} = require(`webpack`)
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
	},
	plugins: [
		...commonConfig.plugins,
		new HotModuleReplacementPlugin(),
		new NamedModulesPlugin(),
	],
}

module.exports = config
