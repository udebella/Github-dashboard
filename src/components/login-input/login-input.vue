<template>
	<div :title="title" :class="displayInputToken ? 'login-failed' : 'login-success'">
		<icon-component :icon="icon" data-test="icon" />
		<debounced-input
			v-if="displayInputToken"
			placeholder="Github token"
			data-test="input-token"
			type="password"
			@input="performLogin"
		/>
	</div>
</template>

<script lang="js">
import { buildUserService } from '../../services/user/user'
import { NO_USER } from '../../services/session/session'
import DebouncedInput from '../debounced-input/debounced-input.vue'
import IconComponent from '../icon/icon-component.vue'

export default {
	name: 'login-input',
	props: {
		userService: {
			default: buildUserService
		}
	},
	data() {
		return {
			icon: 'user',
			connectedUser: this.userService.connectedUser(),
			NO_USER: NO_USER
		}
	},
	computed: {
		displayInputToken() {
			return this.connectedUser === this.NO_USER
		},
		title() {
			return this.displayInputToken ? 'You are not logged in' : `Logged in as ${this.connectedUser.login}`
		}
	},
	methods: {
		async performLogin(value) {
			await this.userService.login(value)
			this.connectedUser = this.userService.connectedUser()
		}
	},
	components: {
		IconComponent,
		DebouncedInput
	}
}
</script>

<style lang="css" scoped>
.login-success {
	color: var(--color-success);
}

.login-failed {
	color: var(--color-failure);
}
</style>
