import Badge from '../badge/badge.vue'

export default {
	name: `item-picker`,
	props: {
		item: {
			required: true,
			type: String,
		},
		selected: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		state() {
			return this.selected ? `ticked` : ``
		},
	},
	methods: {
		toggle() {
			const eventToEmit = this.selected ? `untick` : `tick`
			this.$emit(eventToEmit, this.item)
		},
	},
	components: {
		Badge,
	},
}
