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
		branchStatus: `NO_STATUS`,
	}),
	methods: {
		updateBuildStatus(branchStatus = `NO_STATUS`) {
			this.branchStatus = branchStatus
		},
	},
	components: {
		repositoryLink,
		branchStatus,
	},
}
