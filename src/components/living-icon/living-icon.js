import {differenceInWeeks, formatDistanceToNow} from 'date-fns'
import IconComponent from "@/components/icon/icon-component.vue";

export default {
	name: 'living-icon',
	components: {IconComponent},
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
			return differenceInWeeks(new Date(), this.date) < 1 ? 'living' : 'dead'
		},
	},
}
