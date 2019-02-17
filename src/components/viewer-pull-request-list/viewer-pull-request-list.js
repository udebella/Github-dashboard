import {request as defaultRequest} from '../../services/graphql/graphql-client'
import {buildViewerQuery} from '../../services/graphql/query-builder'
import PullRequestLine from '../pull-request-line/pull-request-line.vue'
import {extractHttp as extractPullRequest, pullRequestFragment} from '../../services/pull-request/pull-request'

export default {
	name: 'viewer-pull-request-list',
	props: {
		request: {
			type: Function,
			default: defaultRequest,
		},
		queryBuilder: {
			type: Function,
			default: buildViewerQuery,
		},
		pullRequestReader: {
			type: Function,
			default: extractPullRequest,
		},
	},
	asyncComputed: {
		pullRequests: {
			async get() {
				const httpResponse = await this.request(this.queryBuilder(viewerFragment))
				return this.pullRequestReader([httpResponse.viewer])
			},
			default: [],
		},
	},
	methods: {
		hasUpdates({commitDate, reviewDate = new Date(0)}) {
			return commitDate.getTime() < reviewDate.getTime()
		},
	},
	components: {
		PullRequestLine,
	},
}


export const viewerFragment = `${pullRequestFragment} 
fragment viewer on User {
  pullRequests(states: OPEN, last: 20) {
    ...PullRequest
  }
}`
