import Login from '@/components/login-input/login-input.vue'
import Configuration from '@/components/configuration-button/configuration-button.vue'
import CustomButton from '../custom-button/custom-button.vue'
import IconComponent from '@/components/icon/icon-component.vue'

export default {
	name: 'dashboard-header',
	data: () => ({
		icon: 'github'
	}),
	components: {
		IconComponent,
		Login,
		Configuration,
		CustomButton
	}
}
