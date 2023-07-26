import Login from '../login/login.vue'
import Configuration from '../configuration/configuration.vue'
import CustomButton from '../custom-button/custom-button.vue'
import IconComponent from "@/components/icon/icon-component.vue";

export default {
	name: 'dashboard-header',
	data: () => ({
		icon: 'github',
	}),
	components: {
		IconComponent,
		Login,
		Configuration,
		CustomButton,
	},
}
