<template>
	<debounced-input placeholder="Github token" data-test="input-token" type="password" @input="performLogin" />
</template>

<script lang="js" setup>
import { buildUserService } from '../../services/user/user'
import DebouncedInput from '../debounced-input/debounced-input.vue'

const props = defineProps({
	userService: {
		default: buildUserService
	}
})

async function performLogin(value) {
	await props.userService.login(value)
}
</script>
