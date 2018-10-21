import {request as defaultRequest} from '../../services/graphql/graphql-client'
import {query} from "./pull-request-list.query"
import PullRequestLine from '../pull-request-line/pull-request-line.vue'

const extractHttp = httpResponse => {
	if (!httpResponse) {
		return []
	}
	return Object.values(httpResponse)
		.filter(({pullRequests}) => pullRequests)
		.map(({pullRequests}) => pullRequests.nodes)
		.reduce((previousValue, currentValue) => [...previousValue, ...currentValue], [])
		.map(({title, url}) => ({prTitle: title, prUrl: url}))
}

export default {
	name: `pull-request-list`,
	props: {
		request: {
			type: Function,
			default: defaultRequest,
		},
	},
	data: () => ({
		pullRequests: [],
	}),
	async created() {
		const watchedRepositories = this.$store.state.watchedRepositories
		const httpResponse = await this.request(query(watchedRepositories))
		this.pullRequests = extractHttp(httpResponse)
	},
	components: {
		PullRequestLine,
	},
}
