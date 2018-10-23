import RepositoryLine from '../repository-line/repository-line.vue'
import RepositoryAdder from '../repository-adder/repository-adder.vue'
import {request} from "../../services/graphql/graphql-client"
import {buildRepositoriesQuery} from "../../services/graphql/query-builder"

const extractHttpData = ({httpData}) => {
	return Object.values(httpData)
		.filter(({defaultBranchRef}) => defaultBranchRef)
		.map(({name, owner, url, defaultBranchRef}) => {
			const repositoryData = defaultBranchRef.target.status
			const statusMapper = ({state, context, targetUrl}) => ({
				jobStatus: state,
				description: context,
				jobUrl: targetUrl,
			})
			return {
				name: name,
				owner: owner.login,
				repositoryUrl: url,
				branchStatus: repositoryData.state,
				statusesList: repositoryData.contexts.map(statusMapper),
			}
		})
}

export const repositoryListFragment = `fragment repository on Repository {
  name,
  owner {
    login
  },
  url,
  defaultBranchRef {
	target {
	  ... on Commit {
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
}`

export default {
	name: `repository-list`,
	props: {
		request: {
			type: Function,
			default: request,
		},
		queryBuilder: {
			type: Function,
			default: buildRepositoriesQuery(repositoryListFragment),
		},
	},
	asyncComputed: {
		repositories: {
			async get() {
				const watchedRepositories = this.$store.state.watchedRepositories
				const httpData = await this.request(this.queryBuilder(watchedRepositories))
				return extractHttpData({httpData})
			},
			default: [],
		},
	},
	components: {
		RepositoryLine,
		RepositoryAdder,
	},
}
