import CustomButton from '../custom-button/custom-button.vue'

export default {
	name: 'configuration',
	computed: {
		configurationMode() {
			return this.$store.state.configurationEnabled ? 'enabled' : 'disabled'
		},
	},
	data: () => ({
		icon: "faCog",
	}),
	methods: {
		toggleConfiguration() {
			this.$store.commit('toggleConfiguration')
		},
	},
	components: {
		CustomButton,
	},
}
