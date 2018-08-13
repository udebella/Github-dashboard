import {library} from '@fortawesome/fontawesome-svg-core'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {buildUserService} from "../../services/user/user"
import {NO_USER} from "../../services/session/session"
import debounce from "debounce"

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
	watch: {
		inputToken() {
			this.debouncedLogin()
		},
	},
	created() {
		// TODO create a component for debounced input text
		this.debouncedLogin = debounce(this.performLogin, 1000)
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
		async performLogin() {
			await this.userService.login(this.inputToken)
			this.connectedUser = this.userService.connectedUser()
		},
	},
}
