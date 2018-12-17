import {request as defaultRequest} from '../../services/graphql/graphql-client'
import PullRequestLine from '../pull-request-line/pull-request-line.vue'
import {buildRepositoriesQuery} from '../../services/graphql/query-builder'
import {extractHttp as extractPullRequest} from '../../services/pull-request/pull-request'

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
	name: 'pull-request-list',
	props: {
		request: {
			type: Function,
			default: defaultRequest,
		},
		queryBuilder: {
			type: Function,
			default: buildRepositoriesQuery(pullRequestFragment),
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
				return Object.values(httpResponse)
					.filter(repositories => repositories && repositories.pullRequests)
					.flatMap(this.pullRequestReader)
			},
			default: [],
		},
	},
	components: {
		PullRequestLine,
	},
}
