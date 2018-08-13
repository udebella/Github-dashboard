const path = require(`path`)

const PROJECT_ROOT = path.resolve(__dirname, `..`)

const hasCommandLineArgument = argument => process.argv.find(arg => arg === argument)

const absolutePath = relativePath => PROJECT_ROOT + relativePath

module.exports = {
	absolutePath,
	hasCommandLineArgument,
}
