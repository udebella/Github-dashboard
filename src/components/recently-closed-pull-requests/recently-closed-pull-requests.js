import {extractHttp as extractPullRequest, pullRequestFragment} from '../../services/pull-request/pull-request'
import {request as defaultRequest} from '../../services/graphql/graphql-client'
import {buildViewerQuery} from '../../services/graphql/query-builder'
import PullRequestLine from '../pull-request-line/pull-request-line.vue'

export default {
	name: 'recently-closed-pull-requests',
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
	components: {
		PullRequestLine,
	},
}

export const viewerFragment = `${pullRequestFragment} 
fragment viewer on User {
  pullRequests(states: MERGED, last: 5) {  
    ...PullRequest
  }
}`
