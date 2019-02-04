const http = require('http')
const prism = require('connect-prism')
const connect = require('connect')

module.exports = () => {
	prism.create({
		name: 'github',
		mode: 'mockrecord',
		context: '/',
		host: 'api.github.com',
		https: true,
		hashFullRequest: true,
		mockFilenameGenerator: 'humanReadable',
		port: 443,
		headers: {
			'host': 'api.github.com',
		},
		delay: 'fast',
	})

	const app = connect()
		.use(prism.middleware)

	http.createServer(app)
		.listen(3100)
}
