import RepositoryLink from '../repository-link/repository-link.vue'
import BranchStatus from '../branch-status/branch-status.vue'
import Badge from '../badge/badge.vue'
import Popover from '../popover/popover.vue'

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
		RepositoryLink,
		BranchStatus,
		Badge,
		Popover,
	},
}
