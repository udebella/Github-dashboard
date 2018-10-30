import {differenceInWeeks} from 'date-fns'

export default {
	name: `living-icon`,
	props: {
		date: {
			type: Date,
			required: true,
		},
	},
	computed: {
		icon() {
			return differenceInWeeks(new Date(), this.date) < 1 ? `heart` : `skull`
		},
	},
}
