import { library } from '@fortawesome/fontawesome-svg-core'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import Login from '../login/login.vue'
import Configuration from '../configuration/configuration.vue'
import CustomButton from '../custom-button/custom-button.vue'

library.add(faCode)

export default {
	name: `dashboard-header`,
	components: {
		Login,
		Configuration,
		CustomButton,
	},
}
