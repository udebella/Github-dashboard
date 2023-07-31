export default {
	name: 'custom-select',
	props: {
		items: {
			type: Array,
			default: () => []
		}
	},
	data: () => ({
		selected: ''
	}),
	methods: {
		notify() {
			this.$emit('selected', this.selected)
		}
	}
}
