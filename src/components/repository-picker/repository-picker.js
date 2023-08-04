import { request } from '../../services/graphql/graphql-client'
import DebouncedInput from '../debounced-input/debounced-input.vue'
import CustomSelect from '../custom-select/custom-select.vue'
import { query } from './repository-picker.query'
import { useRepositoryStore } from '../../stores/repositories'

const extract = (response) => {
	const repositories = (response && response.search && response.search.nodes) || []
	// FIXME defaultBranchRef can be null on new projects
	return repositories.map(({ name, owner, url, defaultBranchRef }) => ({
		name,
		owner: owner.login,
		url,
		defaultBranch: defaultBranchRef.name
	}))
}

export default {
	setup() {
		const repositoryStore = useRepositoryStore()
		return { repositoryStore }
	},
	name: 'repository-picker',
	props: {
		request: {
			default: () => request
		}
	},
	data: () => ({
		repositories: []
	}),
	computed: {
		repositoriesNames() {
			return this.repositories.map(({ name }) => name)
		}
	},
	methods: {
		async retrieveRepositoriesFor(searchQuery) {
			if (searchQuery) {
				const response = await this.request(query(searchQuery))
				this.repositories = extract(response)
			}
		},
		pickRepository(value) {
			const selectedRepository = this.repositories.find(({ name }) => name === value)
			this.repositoryStore.addRepository(selectedRepository)
		}
	},
	components: {
		DebouncedInput,
		CustomSelect
	}
}
