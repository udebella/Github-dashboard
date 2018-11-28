import BuildStatus from '../build-status/build-status.vue'

export default {
	name: 'build-statuses',
	props: {
		statuses: {
			required: true,
			type: Array,
		},
	},
	components: {
		BuildStatus,
	},
}
