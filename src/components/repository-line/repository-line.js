import RepositoryRemover from '../repository-remover/repository-remover.vue'
import BuildStatuses from '../build-statuses/build-statuses.vue'
import BadgeStatus from '../badge-status/badge-status.vue'
import PopOver from '../pop-over/pop-over'

export default {
	name: 'repository-line',
	props: {
		repository: {
			required: true,
			type: Object
		}
	},
	components: {
		BadgeStatus,
		PopOver,
		RepositoryRemover,
		BuildStatuses
	}
}
