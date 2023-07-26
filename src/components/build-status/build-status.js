import CustomButton from '../custom-button/custom-button.vue'

const statusToIcon = {
	FAILURE: 'warning',
	ERROR: 'error',
	PENDING: 'pending',
	SUCCESS: 'success',
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
