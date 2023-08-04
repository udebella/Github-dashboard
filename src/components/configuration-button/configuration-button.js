import CustomButton from '../custom-button/custom-button.vue'
import { useConfigurationStore } from '../../stores/configuration'
import IconComponent from '../icon/icon-component.vue'

export default {
	setup() {
		const configurationStore = useConfigurationStore()
		return { configurationStore }
	},
	name: 'configuration-button',
	computed: {
		configurationMode() {
			return this.configurationStore.configurationEnabled ? 'enabled' : 'disabled'
		}
	},
	methods: {
		toggleConfiguration() {
			this.configurationStore.toggleConfiguration()
		}
	},
	components: {
		IconComponent,
		CustomButton
	}
}
