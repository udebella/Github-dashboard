export default {
	name: `item-picker`,
	props: {
		item: {
			required: true,
			type: String,
		},
	},
	methods: {
		notifyParent({value, checked}) {
			const eventToSend = checked ? `tick` : `untick`
			this.$emit(eventToSend, value)
		},
	},
}
