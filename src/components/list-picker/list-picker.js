import itemPicker from '../item-picker/item-picker.vue'

export default {
	name: `list-picker`,
	props: {
		list: {
			type: Array,
			required: true,
		},
	},
	beforeUpdate() {
		this.tickedItems = []
	},
	data: () => ({
		tickedItems: [],
	}),
	methods: {
		tick(value) {
			this.tickedItems = [...this.tickedItems, value]
			this.$emit(`update`, this.tickedItems)
		},
		untick(value) {
			this.tickedItems = this.tickedItems.filter(item => item !== value)
			this.$emit(`update`, this.tickedItems)
		},
	},
	components: {
		itemPicker,
	},
}
