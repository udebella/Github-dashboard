<template>
	<span v-if="errorMessage" class="error" data-test="error">{{ errorMessage }}</span>
	<debounced-input placeholder="Github token" type="password" @input="onLogin" />
</template>

<script setup lang="ts">
import { buildUserService } from '../../services/user/user'
import DebouncedInput from '../debounced-input/debounced-input.vue'
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

const login = inject('login', buildUserService().login)
const router = useRouter()

const errorMessage = ref('')

const onLogin = async (token: string) => {
	const response = await login(token)
	if (isError(response)) {
		errorMessage.value = response.error.message
	} else {
		await router.push({ name: 'home' })
	}
}

type Error = {
	error: {
		message: string
		code: number
	}
}
const isError = (response: unknown): response is Error => {
	return Object.prototype.hasOwnProperty.call(response ?? {}, 'error')
}
</script>

<style lang="css">
.error {
	background-color: var(--color-failure);
	padding: 4px;
}
</style>
