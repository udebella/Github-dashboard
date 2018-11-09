import {request as defaultRequest} from "../../services/graphql/graphql-client";
import {buildViewerQuery} from "../../services/graphql/query-builder";

export default {
	name: `viewer-pull-request-list`,
	props: {
		request: {
			type: Function,
			default: defaultRequest,
		},
		queryBuilder: {
			type: Function,
			default: buildViewerQuery,
		},
	},
	asyncComputed: {
		pullRequests: {
			async get() {
				await this.request(this.queryBuilder(viewerFragment))
			},
			default: [],
		},
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
