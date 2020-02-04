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
			date: formatDate(this.dateGenerator),
		}
	},
	watch: {
		query() {
			this.callHttp()
		},
	},
	methods: {
		async callHttp() {
			try {
				const response = await this.request(this.query)
				this.date = formatDate(this.dateGenerator)
				this.$emit('httpUpdate', response)
			} catch(ex) {
				// Request will be retried in a few sec
			}
		},
	},
	created() {
		this.interval = setInterval(this.callHttp, 30000)
		return this.callHttp()
	},
	destroyed() {
		clearInterval(this.interval)
	},
}
