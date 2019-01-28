import CustomButton from '../custom-button/custom-button.vue'
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle'
import {faClock} from '@fortawesome/free-solid-svg-icons/faClock'
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons/faExclamationCircle'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons/faTimesCircle'

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
