import {library} from '@fortawesome/fontawesome-svg-core'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {buildUserService} from "../../services/user/user"
import {NO_USER} from "../../services/session/session"

library.add(faUser)

export default {
	name: `login`,
	props: {
		userService: {
			default: buildUserService,
		},
	},
	data() {
		return {
			inputToken: ``,
			connectedUser: this.userService.connectedUser(),
		}
	},
	computed: {
		displayInputToken() {
			return this.connectedUser === NO_USER
		},
	},
	methods: {
		async performLogin() {
			await this.userService.login(this.inputToken)
			this.connectedUser = this.userService.connectedUser()
		},
	},
}
