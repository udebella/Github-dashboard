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
	},
	data() {
		return {
			date: new Date(1234),
		}
	},
	created() {
		const callHttp = async () => {
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
