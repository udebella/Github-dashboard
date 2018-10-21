export default {
	name: `custom-button`,
	props: {
		href: {
			type: String,
		},
	},
	methods: {
		onClick(event) {
			this.$emit(`click`, event)
		},
	},
}
