import {differenceInWeeks, formatDistanceToNow} from 'date-fns'
import {faHeart, faSkull} from '@fortawesome/free-solid-svg-icons'

export default {
	name: 'living-icon',
	props: {
		date: {
			type: Date,
			required: true,
		},
	},
	computed: {
		title() {
			return formatDistanceToNow(this.date, { addSuffix: true })
		},
		icon() {
			return differenceInWeeks(new Date(), this.date) < 1 ? faHeart : faSkull
		},
	},
}
