import {request as defaultRequest} from '../../services/graphql/graphql-client'
import PullRequestLine from '../pull-request-line/pull-request-line.vue'
import {buildRepositoriesQuery} from '../../services/graphql/query-builder'
import {extractHttp as extractPullRequest, pullRequestFragment} from '../../services/pull-request/pull-request'

const pullRequestListFragment = `${pullRequestFragment}
fragment repository on Repository {
  name
  owner {
    login
  }
  url
  pullRequests(states: OPEN, last: 5) {
    ...PullRequest
  }
}`

export default {
	name: 'pull-request-list',
	props: {
		request: {
			type: Function,
			default: defaultRequest,
		},
		queryBuilder: {
			type: Function,
			default: buildRepositoriesQuery(pullRequestListFragment),
		},
		pullRequestReader: {
			type: Function,
			default: extractPullRequest,
		},
	},
	asyncComputed: {
		pullRequests: {
			async get() {
				const watchedRepositories = this.$store.state.watchedRepositories
				const httpResponse = await this.request(this.queryBuilder(watchedRepositories))
				const repositories = Object.values(httpResponse)
					.filter(repositories => repositories && repositories.pullRequests)
				return this.pullRequestReader(repositories)
			},
			default: [],
		},
	},
	methods: {
		hasUpdates({commitDate, reviewDate = new Date(0)}) {
			return commitDate.getTime() > reviewDate.getTime()
		},
	},
	components: {
		PullRequestLine,
	},
}
