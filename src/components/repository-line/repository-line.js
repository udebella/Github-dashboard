import RepositoryLink from '../repository-link/repository-link.vue'
import BranchStatus from '../branch-status/branch-status.vue'
import Badge from '../badge/badge.vue'
import Popover from '../popover/popover.vue'
import RepositoryRemover from '../repository-remover/repository-remover.vue'

export default {
	name: `repository-line`,
	props: {
		repository: {
			required: true,
			type: Object,
		},
	},
	components: {
		RepositoryLink,
		BranchStatus,
		Badge,
		Popover,
		RepositoryRemover,
	},
}
