import repositoryLink from '../repository-link/repository-link.vue'
import branchStatus from '../branch-status/branch-status.vue'

export default {
    name: "repository-line",
    props: {
        repository: {
            required: true,
            type: Object
        }
    },
    data: () => ({
        branchStatus: '',
    }),
    methods: {
        updateBuildStatus(val) {
            if (val) {
                this.branchStatus = val
            }
        },
    },
    components: {
        repositoryLink,
        branchStatus,
    },
}