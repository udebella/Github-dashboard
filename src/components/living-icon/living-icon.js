import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import differenceInWeeks from 'date-fns/difference_in_weeks'
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
			return distanceInWordsToNow(this.date, { addSuffix: true })
		},
		icon() {
			return differenceInWeeks(new Date(), this.date) < 1 ? faHeart : faSkull
		},
	},
}
