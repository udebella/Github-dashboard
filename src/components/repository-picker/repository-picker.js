import {request} from "../../services/graphql/graphql-client"
import DebouncedInput from '../debounced-input/debounced-input.vue'
import CustomSelect from '../custom-select/custom-select.vue'
import {query} from "./repository-picker.query"

const extract = response => {
	const repositories = response &&
		response.repositoryOwner &&
		response.repositoryOwner.repositories &&
		response.repositoryOwner.repositories.nodes || []
	// FIXME defaultBranchRef can be null on new projects
	return repositories.map(({name, owner, url, defaultBranchRef}) => ({
		name,
		owner: owner.login,
		url,
		defaultBranch: defaultBranchRef.name,
	}))
}

export default {
	name: `repository-picker`,
	props: {
		request: {
			default: () => request,
		},
	},
	data: () => ({
		repositories: [],
	}),
	computed: {
		repositoriesNames() {
			return this.repositories.map(({name}) => name)
		},
	},
	methods: {
		async retrieveRepositoriesFor(ownerName) {
			if (ownerName) {
				const response = await this.request(query(ownerName))
				this.repositories = extract(response)
			}
		},
		pickRepository(value) {
			const selectedRepository = this.repositories.find(({name}) => name === value)
			this.$store.commit(`addRepository`, selectedRepository)
		},
	},
	components: {
		DebouncedInput,
		CustomSelect,
	},
}
