import RepositoryLine from '../repository-line/repository-line.vue'
import RepositoryAdder from '../repository-adder/repository-adder.vue'
import {request} from "../../services/graphql/graphql-client"
import {query} from "./repository-list-query"

const extractHttpData = ({httpData}) => {
	return Object.values(httpData).map(data => {
		const repositoryData = data.defaultBranchRef.target.status
		const statusMapper = ({state, context, targetUrl}) => ({
			jobStatus: state,
			description: context,
			jobUrl: targetUrl,
		})
		return {
			name: data.name,
			owner: data.owner.login,
			repositoryUrl: data.url,
			branchStatus: repositoryData.state,
			statusesList: repositoryData.contexts.map(statusMapper),
		}
	})
}

export default {
	name: `repository-list`,
	props: {
		request: {
			type: Function,
			default: request,
		},
	},
	data: () => ({
		repositories: [],
	}),
	async created() {
		const watchedRepositories = this.$store.state.watchedRepositories
		const httpData = await this.request(query(watchedRepositories))
		this.repositories = extractHttpData({httpData})
	},
	components: {
		RepositoryLine,
		RepositoryAdder,
	},
}
