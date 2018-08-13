import { library } from '@fortawesome/fontawesome-svg-core'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import Login from '../login/login.vue'

library.add(faCode)

export default {
	name: `dashboard-header`,
	components: {
		Login,
	},
}
