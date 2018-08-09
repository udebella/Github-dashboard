import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faExclamationCircle, faTimesCircle, faClock } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle)
library.add(faExclamationCircle)
library.add(faTimesCircle)
library.add(faClock)

const statusToIcon = {
	FAILURE: `exclamation-circle`,
	ERROR: `times-circle`,
	PENDING: `clock`,
	SUCCESS: `check-circle`,
}

export default {
	name: `build-status`,
	props: {
		description: {
			type: String,
			required: true,
		},
		url: {
			required: true,
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
}
