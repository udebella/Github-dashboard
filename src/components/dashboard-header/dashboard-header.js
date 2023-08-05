import CustomButton from '../custom-button/custom-button.vue'
import IconComponent from '../icon/icon-component.vue'
import LoginInput from '../login-input/login-input.vue'
import ConfigurationButton from '../configuration-button/configuration-button.vue'

export default {
	name: 'dashboard-header',
	data: () => ({
		icon: 'github'
	}),
	components: {
		IconComponent,
		LoginInput,
		CustomButton,
		ConfigurationButton
	}
}
