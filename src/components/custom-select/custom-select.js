export default {
	name: `custom-select`,
	props: {
		items: {
			type: Array,
			default: () => [],
		},
	},
	data: () => ({
		selected: ``,
	}),
	methods: {
		notify() {
			console.log(this.selected); // eslint-disable-line
			this.$emit(`selected`, this.selected)
		},
	},
}
