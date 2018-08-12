import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
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
	computed: {
		displayInputToken() {
			return this.userService.connectedUser() === NO_USER
		},
	},
}
