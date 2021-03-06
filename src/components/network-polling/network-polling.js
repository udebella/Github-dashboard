import {request} from '../../services/graphql/graphql-client'
import RefreshIndicator from '../refresh-indicator/refresh-indicator.vue'

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
			promise: new Promise(() => {}),
			timeBetweenRefresh: this.$store.state.timeBetweenRefresh,
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
				this.promise = this.request(this.query)
				const response = await this.promise
				this.$emit('http-update', response)
			} catch(ex) {
				// Request will be retried in a few sec
			}
		},
	},
	created() {
		this.interval = setInterval(this.callHttp, this.timeBetweenRefresh * 1000)
		return this.callHttp()
	},
	destroyed() {
		clearInterval(this.interval)
	},
	components: {
		RefreshIndicator,
	},
}
