import Badge from '../badge/badge.vue'

export default {
	name: `item-picker`,
	props: {
		item: {
			required: true,
			type: String,
		},
	},
	data: () => ({
		state: `untick`,
	}),
	methods: {
		toggle() {
			this.state = this.state === `tick` ? `untick` : `tick`
			this.$emit(this.state, this.item)
		},
	},
	components: {
		Badge,
	},
}
