import Badge from '../badge/badge.vue'
import LivingIcon from '../living-icon/living-icon.vue'

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
	},
	components: {
		Badge,
		LivingIcon,
	},
}
