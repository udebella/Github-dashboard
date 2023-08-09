<template>
	<debounced-input placeholder="Github token" type="password" @input="onLogin" />
</template>

<script setup lang="ts">
import { buildUserService } from '../../services/user/user'
import DebouncedInput from '../debounced-input/debounced-input.vue'
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const login = inject('login', buildUserService().login)
const router = useRouter()

const onLogin = async (token: string) => {
	await login(token)
	await router.push('home')
}
</script>
