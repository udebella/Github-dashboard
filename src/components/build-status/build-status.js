import CustomButton from '../custom-button/custom-button.vue'
import {faCheckCircle, faClock, faExclamationCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'

const statusToIcon = {
	FAILURE: faExclamationCircle,
	ERROR: faTimesCircle,
	PENDING: faClock,
	SUCCESS: faCheckCircle,
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
