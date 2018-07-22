import repositoryLink from '../repository-link/repository-link.vue'
import branchStatus from '../branch-status/branch-status.vue'

export default {
    name: "repository-line",
    props: {
        repository: {
            required: true,
            type: Object,
        },
    },
    data: () => ({
        branchStatus: '',
    }),
    methods: {
        updateBuildStatus(branchStatus) {
            if (branchStatus) {
                this.branchStatus = branchStatus
            }
        },
        branchStatusClass() {
            if (this.branchStatus) {
                return this.branchStatus
            }
            return 'NO_STATUS'
        },
    },
    components: {
        repositoryLink,
        branchStatus,
    },
}