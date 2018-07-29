import {request} from '../../services/graphql-client'
import {query} from './branch-status.query'
import buildStatuses from '../build-statuses/build-statuses.vue'

const extractStatuses = response => {
    const status = response.repository.ref.target.status
    return status || {}
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
        const {state, contexts} = extractStatuses(response)
        this.state = state || ``
        this.statusesList = contexts || []
        this.$emit(`build-status`, this.state)
    },
    components: {
        buildStatuses,
    },
}