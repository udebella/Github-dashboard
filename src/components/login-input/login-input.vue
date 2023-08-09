<template>
	<debounced-input placeholder="Github token" data-test="input-token" type="password" @input="performLogin" />
</template>

<script lang="js">
import { buildUserService } from '../../services/user/user'
import DebouncedInput from '../debounced-input/debounced-input.vue'

export default {
	name: 'login-input',
	props: {
		userService: {
			default: buildUserService
		}
	},
	methods: {
		async performLogin(value) {
			await this.userService.login(value)
		}
	},
	components: {
		DebouncedInput
	}
}
</script>
