import {request as defaultRequest} from '../../services/graphql/graphql-client'
import PullRequestLine from '../pull-request-line/pull-request-line.vue'
import {buildRepositoriesQuery} from "../../services/graphql/query-builder"

const pullRequestFragment = `fragment repository on Repository {
  name
  owner {
    login
  }
  url
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

export default {
	name: `pull-request-list`,
	props: {
		request: {
			type: Function,
			default: defaultRequest,
		},
		queryBuilder: {
			type: Function,
			default: buildRepositoriesQuery(pullRequestFragment),
		},
	},
	asyncComputed: {
		pullRequests: {
			async get() {
				const watchedRepositories = this.$store.state.watchedRepositories
				const httpResponse = await this.request(this.queryBuilder(watchedRepositories))
				return extractHttp(httpResponse)
			},
			default: [],
		},
	},
	components: {
		PullRequestLine,
	},
}

const extractHttp = httpResponse => {
	return Object.values(httpResponse)
		.filter(repositories => repositories && repositories.pullRequests)
		.map(({pullRequests}) => pullRequests.nodes)
		.reduce((previousValue, currentValue) => [...previousValue, ...currentValue], [])
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
