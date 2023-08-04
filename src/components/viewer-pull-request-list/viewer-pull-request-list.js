import { buildViewerQuery } from '../../services/graphql/query-builder'
import PullRequestLine from '../pull-request-line/pull-request-line.vue'
import NetworkPolling from '../network-polling/network-polling.vue'
import { extractHttp as extractPullRequest, pullRequestFragment } from '../../services/pull-request/pull-request'
import { buildUserService } from '../../services/user/user'

export default {
	name: 'viewer-pull-request-list',
	props: {
		queryBuilder: {
			type: Function,
			default: buildViewerQuery
		},
		pullRequestReader: {
			type: Function,
			default: extractPullRequest
		},
		userService: {
			type: Object,
			default: buildUserService
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
		hasUpdates(lastEventAuthor) {
			return this.userService.connectedUser().login !== lastEventAuthor
		},
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
  pullRequests(states: OPEN, last: 20) {
    ...PullRequest
  }
}`
