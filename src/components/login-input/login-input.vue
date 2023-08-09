<template>
	<debounced-input placeholder="Github token" data-test="input-token" type="password" @input="performLogin" />
</template>

<script lang="js" setup>
import { buildUserService } from '../../services/user/user'
import DebouncedInput from '../debounced-input/debounced-input.vue'
import { inject } from 'vue'

const login = inject('login', buildUserService().login)

async function performLogin(value) {
	await login(value)
}
</script>
