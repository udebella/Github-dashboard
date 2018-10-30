import {differenceInWeeks, distanceInWordsToNow} from 'date-fns'

export default {
	name: `living-icon`,
	props: {
		date: {
			type: Date,
			required: true,
		},
	},
	computed: {
		title() {
			return distanceInWordsToNow(this.date, { addSuffix: true })
		},
		icon() {
			return differenceInWeeks(new Date(), this.date) < 1 ? `heart` : `skull`
		},
	},
}
