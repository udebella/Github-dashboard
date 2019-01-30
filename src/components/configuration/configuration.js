import CustomButton from '../custom-button/custom-button.vue'
import {faCog} from '@fortawesome/free-solid-svg-icons'

export default {
	name: 'configuration',
	computed: {
		configurationMode() {
			return this.$store.state.configurationEnabled ? 'enabled' : 'disabled'
		},
	},
	data: () => ({
		icon: faCog,
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
