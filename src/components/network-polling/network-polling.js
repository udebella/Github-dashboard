import {request} from "../../services/graphql-client"

export default {
	name: `network-polling`,
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
	created() {
		const callHttp = async () => {
			const response = await this.request(this.query)
			this.$emit(`httpUpdate`, response)
		}
		this.interval = setInterval(callHttp, 10000)
		callHttp()
	},
	destroyed() {
		clearInterval(this.interval)
	},
}
