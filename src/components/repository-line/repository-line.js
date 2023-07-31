import Badge from '../badge/badge.vue'
import Popover from '../popover/popover.vue'
import RepositoryRemover from '../repository-remover/repository-remover.vue'
import BuildStatuses from '../build-statuses/build-statuses.vue'

export default {
	name: 'repository-line',
	props: {
		repository: {
			required: true,
			type: Object
		}
	},
	components: {
		Badge,
		Popover,
		RepositoryRemover,
		BuildStatuses
	}
}
