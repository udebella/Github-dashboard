import {request} from '../../services/graphql-client'
import {query} from './starred-repo.query'
import debounce from 'debounce'
import listPicker from '../list-picker/list-picker.vue'

const extract = repositoryType => response => {
	const repositories = response &&
		response.user &&
		response.user[repositoryType] &&
		response.user[repositoryType].nodes || []
	return repositories.map(({name, owner}) => ({name, owner: owner.login}))
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
	computed: {
		watchedRepositories() {
			return this.$store.state.watchedRepositories
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
		selectRepository(repository) {
			const toto = [...this.userRepositories, ...this.userStarredRepositories]
				.find(({name}) => name === repository)
			this.$store.commit(`addRepository`, toto)
		},
		formatForListPicker(repositoryList) {
			return repositoryList.map(({name}) => name)
		},
	},
	components: {
		listPicker,
	},
}
