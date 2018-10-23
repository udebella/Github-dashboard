import {request as defaultRequest} from '../../services/graphql/graphql-client'
import PullRequestLine from '../pull-request-line/pull-request-line.vue'
import {buildRepositoriesQuery} from "../../services/graphql/query-builder"

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

const pullRequestFragment = `fragment repository on Repository {
  name
  owner {
    login
  }
  url
  pullRequests(states: OPEN, last: 5) {
    nodes {
      title
      url
      comments {
        totalCount
      }
      reviews(first: 1) {
        totalCount
      }
      state
      commits(last: 1) {
        nodes {
          commit {
            status {
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
