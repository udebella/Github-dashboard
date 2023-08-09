<template>
	<div data-test="title">Github Dashboard</div>
	<div data-test="helper">
		You must generate a token to login using the
		<a
			href="https://github.com/settings/tokens/new?description=Github%20Dashboard&scopes=repo%2Cread%3Auser%2Cuser%3Aemail"
			data-test="link"
			>settings</a
		>
		of your github instance
	</div>
	<!-- @vue-ignore TODO remove when the component is typescript compliant -->
	<login-input />
</template>

<script setup lang="ts">
import LoginInput from '../components/login-input/login-input.vue'
</script>
