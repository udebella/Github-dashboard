import {request as defaultRequest} from '../../services/graphql/graphql-client'
import {query} from "./pull-request-list.query"
import PullRequestLine from '../pull-request-line/pull-request-line.vue'

const extractBuildStatus = commits => {
	return commits &&
		commits.nodes &&
		commits.nodes[0] &&
		commits.nodes[0].commit &&
		commits.nodes[0].commit.status &&
		commits.nodes[0].commit.status.state || `UNKNOWN`
}

const extractHttp = httpResponse => {
	if (!httpResponse) {
		return []
	}
	return Object.values(httpResponse)
		.filter(({pullRequests}) => pullRequests)
		.map(({pullRequests}) => pullRequests.nodes)
		.reduce((previousValue, currentValue) => [...previousValue, ...currentValue], [])
		.map(({title, url, commits}) => ({prTitle: title, prUrl: url, buildStatus: extractBuildStatus(commits)}))
}

export default {
	name: `pull-request-list`,
	props: {
		request: {
			type: Function,
			default: defaultRequest,
		},
	},
	asyncComputed: {
		pullRequests: {
			async get() {
				const watchedRepositories = this.$store.state.watchedRepositories
				const httpResponse = await this.request(query(watchedRepositories))
				return extractHttp(httpResponse)
			},
			default: [],
		},
	},
	components: {
		PullRequestLine,
	},
}
