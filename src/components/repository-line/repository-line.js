import RepositoryRemover from '../repository-remover/repository-remover.vue'
import BuildStatuses from '../build-statuses/build-statuses.vue'
import Badge from '../badge-status/badge-status.vue'
import Popover from '../pop-over/pop-over'

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
