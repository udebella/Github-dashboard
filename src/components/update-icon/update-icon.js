import {faEye} from '@fortawesome/free-solid-svg-icons'

export default {
	name: 'update-icon',
	props: {
		hasUpdates: {
			type: Boolean,
			required: true,
		},
	},
	data: () => ({
		icon: faEye,
	}),
}
