import {faEye} from '@fortawesome/free-solid-svg-icons'

export default {
	name: 'update-icon',
	props: {
		hasUpdates: {
			type: Boolean,
			default: true,
		},
	},
	data: () => ({
		icon: faEye,
	}),
}
