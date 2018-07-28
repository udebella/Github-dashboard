import repositoryLink from '../repository-link/repository-link.vue'
import branchStatus from '../branch-status/branch-status.vue'

export default {
    name: `repository-line`,
    props: {
        repository: {
            required: true,
            type: Object,
        },
    },
    data: () => ({
        branchStatus: ``,
    }),
    methods: {
        updateBuildStatus(branchStatus) {
            this.branchStatus = branchStatus
        },
        branchStatusClass() {
            return this.branchStatus || `NO_STATUS`
        },
    },
    components: {
        repositoryLink,
        branchStatus,
    },
}