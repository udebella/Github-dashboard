import {
	extractHttp as extractPullRequest,
	pullRequestFragment
} from '../../services/pull-request/pull-request'
import { buildViewerQuery } from '../../services/graphql/query-builder'
import PullRequestLine from '../pull-request-line/pull-request-line.vue'
import NetworkPolling from '../network-polling/network-polling.vue'

export default {
	name: 'recently-closed-pull-requests',
	props: {
		queryBuilder: {
			type: Function,
			default: buildViewerQuery
		},
		pullRequestReader: {
			type: Function,
			default: extractPullRequest
		}
	},
	data() {
		return {
			pullRequests: []
		}
	},
	computed: {
		query() {
			return this.queryBuilder(viewerFragment)
		}
	},
	methods: {
		updatePullRequests(httpResponse) {
			this.pullRequests = this.pullRequestReader([httpResponse.viewer])
		}
	},
	components: {
		PullRequestLine,
		NetworkPolling
	}
}

export const viewerFragment = `${pullRequestFragment}
fragment viewer on User {
  pullRequests(states: MERGED, last: 5) {
    ...PullRequest
  }
}`
