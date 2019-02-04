const {HotModuleReplacementPlugin, NamedModulesPlugin} = require('webpack')
const commonConfig = require('./webpack.common')
const createMockServer = require('./mock-server')

createMockServer()

const config = {
	...commonConfig,
	mode: 'development',
	devServer: {
		clientLogLevel: 'warning',
		port: 3000,
		hot: true,
		open: true,
		proxy: {
			'/graphql': 'http://localhost:3100',
		},
	},
	optimization: {
		...commonConfig.optimization,
		usedExports: true,
	},
	plugins: [
		...commonConfig.plugins,
		new HotModuleReplacementPlugin(),
		new NamedModulesPlugin(),
	],
}

module.exports = config
