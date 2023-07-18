import CustomButton from '../custom-button/custom-button.vue'

const statusToIcon = {
	FAILURE: 'fa-exclamation-circle',
	ERROR: 'fa-times-circle',
	PENDING: 'fa-clock',
	SUCCESS: 'fa-check-circle',
}

export default {
	name: 'build-status',
	props: {
		description: {
			type: String,
			required: true,
		},
		url: {
			type: String,
		},
		state: {
			required: true,
			type: String,
		},
	},
	computed: {
		icon() {
			return statusToIcon[this.state]
		},
	},
	components: {
		CustomButton,
	},
}
