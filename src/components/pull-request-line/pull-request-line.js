import Badge from '../badge/badge.vue'
import LivingIcon from '../living-icon/living-icon.vue'
import BuildStatuses from '../build-statuses/build-statuses.vue'
import Popover from '../popover/popover.vue'

export default {
	name: `pull-request-line`,
	props: {
		title: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
		buildStatus: {
			type: String,
			required: true,
		},
		creationDate: {
			type: Date,
			required: true,
		},
		statusesList: {
			type: Array,
			default: () => [],
		},
	},
	components: {
		Badge,
		LivingIcon,
		BuildStatuses,
		Popover,
	},
}
