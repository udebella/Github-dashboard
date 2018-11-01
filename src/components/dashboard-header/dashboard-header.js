import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Login from '../login/login.vue'
import Configuration from '../configuration/configuration.vue'
import CustomButton from '../custom-button/custom-button.vue'

export default {
	name: `dashboard-header`,
	data: () => ({
		icon: faGithub,
	}),
	components: {
		Login,
		Configuration,
		CustomButton,
	},
}
