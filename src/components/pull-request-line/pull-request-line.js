import Badge from '../badge/badge.vue'

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
	},
	components: {
		Badge,
	},
}
