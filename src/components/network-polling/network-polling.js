import {request} from '../../services/graphql/graphql-client'

export default {
	name: 'network-polling',
	props: {
		query: {
			type: String,
			required: true,
		},
		request: {
			type: Function,
			default: request,
		},
		dateGenerator: {
			type: Function,
			default: () => new Date(),
		},
	},
	data() {
		return {
			date: this.dateGenerator(),
		}
	},
	created() {
		const callHttp = async () => {
			this.date = this.dateGenerator()
			const response = await this.request(this.query)
			this.$emit('httpUpdate', response)
		}
		this.interval = setInterval(callHttp, 30000)
		return callHttp()
	},
	destroyed() {
		clearInterval(this.interval)
	},
}
