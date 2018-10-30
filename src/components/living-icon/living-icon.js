import {differenceInWeeks, distanceInWordsToNow} from 'date-fns'
import {library} from "@fortawesome/fontawesome-svg-core";
import {faHeart, faSkull} from "@fortawesome/free-solid-svg-icons";

library.add(faHeart)
library.add(faSkull)

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
