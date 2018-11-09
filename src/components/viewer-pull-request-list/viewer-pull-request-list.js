import {request as defaultRequest} from '../../services/graphql/graphql-client'
import {buildViewerQuery} from '../../services/graphql/query-builder'
import PullRequestLine from '../pull-request-line/pull-request-line.vue'

// TODO duplicated code with pull-request-list component here
const extractPullRequests = httpResponse => {
	return httpResponse.viewer.pullRequests.nodes
		.sort(({updatedAt: first}, {updatedAt: second}) => new Date(second).getTime() - new Date(first).getTime())
		.map(({title, url, commits, createdAt}) => ({
			prTitle: title,
			prUrl: url,
			creationDate: new Date(createdAt),
			buildStatus: extractBuildStatus(commits),
			statuses: extractStatuses(commits),
		}))
}

const extractBuildStatus = commits => {
	const status = extractStatus(commits)
	return status &&
		status.state || `NO_STATUS`

}

const extractStatuses = commits => {
	const status = extractStatus(commits)
	return status &&
		status.contexts &&
		status.contexts.map(({state, context, targetUrl}) => ({
			jobStatus: state,
			description: context,
			jobUrl: targetUrl,
		})) || []
}

const extractStatus = commits => {
	return commits &&
		commits.nodes &&
		commits.nodes[0] &&
		commits.nodes[0].commit &&
		commits.nodes[0].commit.status
}

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
				const httpResponse = await this.request(this.queryBuilder(viewerFragment))
				return extractPullRequests(httpResponse)
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
