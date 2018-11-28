import {request as defaultRequest} from '../../services/graphql/graphql-client'
import {buildViewerQuery} from '../../services/graphql/query-builder'
import PullRequestLine from '../pull-request-line/pull-request-line.vue'
import {extractHttp as extractPullRequest} from '../../services/pull-request/pull-request'

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
				return this.pullRequestReader(httpResponse.viewer)
			},
			default: [],
		},
	},
	components: {
		PullRequestLine,
	},
}


export const viewerFragment = `fragment viewer on User {
  pullRequests(states: OPEN, last: 20) {
    nodes {
      title
      url
      comments {
        totalCount
      }
      createdAt
      updatedAt
      reviews(first: 1) {
        totalCount
      }
      state
      commits(last: 1) {
        nodes {
          commit {
            status {
            contexts {
			    state
			    context
			    targetUrl
			  }
              state
            }
          }
        }
      }
    }
  }
}`
