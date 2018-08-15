import {library} from '@fortawesome/fontawesome-svg-core'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {buildUserService} from "../../services/user/user"
import {NO_USER} from "../../services/session/session"
import DebouncedInput from '../debounced-input/debounced-input.vue'

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
			connectedUser: this.userService.connectedUser(),
		}
	},
	computed: {
		displayInputToken() {
			return this.connectedUser === NO_USER
		},
		title() {
			return this.displayInputToken ? `You are not logged in` : `Logged in as ${this.connectedUser.login}`
		},
	},
	methods: {
		async performLogin({value}) {
			await this.userService.login(value)
			this.connectedUser = this.userService.connectedUser()
		},
	},
	components: {
		DebouncedInput,
	},
}
