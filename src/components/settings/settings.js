import {request} from '../../services/graphql-client'
import {query} from './starred-repo.query'
import debounce from 'debounce'
import ListPicker from '../list-picker/list-picker.vue'

const extract = repositoryType => response => {
	const repositories = response &&
		response.user &&
		response.user[repositoryType] &&
		response.user[repositoryType].nodes || []
	return repositories.map(({name, owner, url, defaultBranchRef}) => ({
		name,
		owner: owner.login,
		url,
		defaultBranch: defaultBranchRef.name,
	}))
}

const extractRepositories = extract(`repositories`)

const extractStarredRepositories = extract(`starredRepositories`)

export default {
	name: `settings`,
	data: () => ({
		username: ``,
		userRepositories: [],
		userStarredRepositories: [],
		request,
	}),
	watch: {
		username() {
			this.refreshUserRepositories()
		},
	},
	created() {
		const refreshUserRepositories = async () => {
			const response = await this.request(query(this.username))
			this.userStarredRepositories = extractStarredRepositories(response)
			this.userRepositories = extractRepositories(response)
		}

		this.refreshUserRepositories = debounce(refreshUserRepositories, 1000)
	},
	methods: {
		selectRepository(name) {
			const repository = this.findRepository(name)
			this.$store.commit(`addRepository`, repository)
		},
		unselectRepository(name) {
			const repository = this.findRepository(name)
			this.$store.commit(`removeRepository`, repository)
		},
		findRepository(repository) {
			// FIXME this does not handle properly forks
			return [...this.userRepositories, ...this.userStarredRepositories]
				.find(({name}) => name === repository)
		},
		formatForListPicker(repositoryList) {
			return repositoryList.map(({name}) => name)
		},
	},
	components: {
		ListPicker,
	},
}
