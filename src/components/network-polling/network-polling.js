import {request} from '../../services/graphql/graphql-client'
import {format} from 'date-fns'

const formatDate = dateGenerator => format(dateGenerator(), 'mm:ss')

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
			date: formatDate(this.dateGenerator()),
		}
	},
	created() {
		const callHttp = async () => {
			this.date = formatDate(this.dateGenerator)
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
