<template>
	<label>
		Github api url
		<input :value="store.githubApi" type="text" @input="updateGithubApi" />
	</label>
</template>

<script setup lang="ts">
import { useConfigurationStore } from '../../stores/configuration/configuration'

const store = useConfigurationStore()

const updateGithubApi = (event: Event) => {
	const input = event.target as HTMLInputElement
	store.updateGithubApi(input.value)
}
</script>
