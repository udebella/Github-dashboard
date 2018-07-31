import {request} from '../../services/graphql-client'
import {query} from './starred-repo.query'
import debounce from 'debounce'
import listPicker from '../list-picker/list-picker.vue'

const extract = repositoryType => response => {
	const repositories = response &&
		response.user &&
		response.user[repositoryType] &&
		response.user[repositoryType].nodes || []
	return repositories.map(({name}) => name)
}

const extractRepositories = extract(`repositories`)

const extractStarredRepositories = extract(`starredRepositories`)

export default {
	name: `settings`,
	data: () => ({
		username: ``,
		userRepositories: [],
		userStarredRepositories: [],
		watchedRepositories: {},
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
		copy(newRepos) {
			return {
				...this.watchedRepositories,
				[this.username]: {
					...this.watchedRepositories[this.username],
					...newRepos,
				},
			}
		},
		updateRepositories(array) {
			this.watchedRepositories = this.copy({repositories: array})
		},
		updateStarredRepositories(array) {
			this.watchedRepositories = this.copy({starredRepositories: array})
		},
	},
	components: {
		listPicker,
	},
}
