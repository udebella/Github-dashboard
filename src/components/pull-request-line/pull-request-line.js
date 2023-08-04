import LivingIcon from '../living-icon/living-icon.vue'
import UpdateIcon from '../update-icon/update-icon.vue'
import BuildStatuses from '../build-statuses/build-statuses.vue'
import BadgeStatus from '../badge-status/badge-status.vue'
import PopOver from '../pop-over/pop-over'

export default {
	name: 'pull-request-line',
	props: {
		title: {
			type: String,
			required: true
		},
		url: {
			type: String,
			required: true
		},
		buildStatus: {
			type: String,
			required: true
		},
		creationDate: {
			type: Date,
			required: true
		},
		hasUpdates: {
			type: Boolean,
			required: true
		},
		statusesList: {
			type: Array,
			default: () => []
		}
	},
	components: {
		BadgeStatus,
		LivingIcon,
		UpdateIcon,
		BuildStatuses,
		PopOver
	}
}
