import itemPicker from '../item-picker/item-picker.vue'

export default {
	name: `list-picker`,
	props: {
		list: {
			type: Array,
			required: true,
		},
	},
	methods: {
		tick(value) {
			this.$emit(`tick`, value)
		},
		untick(value) {
			this.$emit(`untick`, value)
		},
	},
	components: {
		itemPicker,
	},
}
