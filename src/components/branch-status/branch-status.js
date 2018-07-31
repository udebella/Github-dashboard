import {request} from '../../services/graphql-client'
import {query} from './branch-status.query'
import buildStatuses from '../build-statuses/build-statuses.vue'

const extractStatuses = response => {
	const {state = `NO_STATUS`, contexts = []} = response &&
		response.repository &&
		response.repository.ref &&
		response.repository.ref.target &&
		response.repository.ref.target.status || {}
	return {state, statusesList: contexts}
}

export default {
	name: `branch-status`,
	props: {
		name: {
			type: String,
			required: true,
		},
		branch: {
			type: String,
			required: true,
		},
		owner: {
			type: String,
			required: true,
		},
		request: {
			type: Function,
			default: request,
		},
	},
	data: () => ({
		state: ``,
		statusesList: [],
	}),
	async created() {
		const response = await this.request(query({
			owner: this.owner,
			branch: this.branch,
			repository: this.name,
		}))
		const {state, statusesList} = extractStatuses(response)
		this.state = state
		this.statusesList = statusesList
		this.$emit(`build-status`, this.state)
	},
	components: {
		buildStatuses,
	},
}
