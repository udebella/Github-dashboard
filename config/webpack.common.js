const {absolutePath} = require('./helpers')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

const commonConfig = {
	resolve: {
		extensions: ['.js', '.vue', '.scss'],
	},
	entry: absolutePath('/src/main.js'),
	output: {
		pathinfo: true,
		path: absolutePath('/dist'),
		filename: '[name]-[hash:8].js',
		chunkFilename: '[name]-[contenthash:8].js',
	},
	module: {
		rules: [
			{
				test: /\.(js|vue)$/,
				enforce: 'pre',
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					fix: true,
				},
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.scss$/,
				loader: [
					'vue-style-loader',
					{
						loader: 'css-loader',
						options: {
							esModule: false
						}
					},
					'sass-loader',
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'assets/fonts/',
				},
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: absolutePath('/src/index.html'),
		}),
	],
}

module.exports = commonConfig
