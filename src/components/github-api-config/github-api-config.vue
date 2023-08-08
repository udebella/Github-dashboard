<template>
	<input
		v-if="store.configurationEnabled"
		:value="store.githubApi"
		type="text"
		data-test="input"
		@input="updateGithubApi"
	/>
</template>

<script setup lang="ts">
import { useConfigurationStore } from '../../stores/configuration/configuration'

const store = useConfigurationStore()

const updateGithubApi = (event: Event) => {
	const input = event.target as HTMLInputElement
	store.updateGithubApi(input.value)
}
</script>

<style src="./github-api-config.scss" scoped></style>
