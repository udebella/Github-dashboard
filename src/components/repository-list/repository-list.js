import RepositoryLine from '../repository-line/repository-line.vue'
import RepositoryAdder from '../repository-adder/repository-adder.vue'
import NetworkPolling from '../network-polling/network-polling.vue'
import {buildRepositoriesQuery} from '../../services/graphql/query-builder'
import {useRepositoryStore} from "@/stores/repositories";

const extractHttpData = ({httpData}) => {
	return Object.values(httpData)
		.filter(repositories => repositories && repositories.defaultBranchRef)
		.map(({name, owner, url, defaultBranchRef}) => {
			const repositoryData = defaultBranchRef.target.status || {}
			const statusMapper = ({state, context, targetUrl}) => ({
				jobStatus: state,
				description: context,
				jobUrl: targetUrl,
			})
			return {
				name: name,
				owner: owner.login,
				repositoryUrl: url,
				branchStatus: repositoryData.state || 'NO_STATUS',
				statusesList: repositoryData.contexts && repositoryData.contexts.map(statusMapper) || [],
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
	setup() {
		const repositoryStore = useRepositoryStore()
		return { repositoryStore }
	},
	name: 'repository-list',
	props: {
		queryBuilder: {
			type: Function,
			default: buildRepositoriesQuery(repositoryListFragment),
		},
	},
	data() {
		return {
			repositories: [],
		}
	},
	computed: {
		query() {
			const watchedRepositories = this.repositoryStore.watched
			return this.queryBuilder(watchedRepositories)
		},
	},
	methods: {
		updateRepositories(httpData) {
			this.repositories = extractHttpData({httpData})
		},
	},
	components: {
		RepositoryLine,
		RepositoryAdder,
		NetworkPolling,
	},
}
