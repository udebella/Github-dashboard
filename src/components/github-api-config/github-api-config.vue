<template>
	<label>Github api url</label>
	<input :value="store.githubApi" type="text" @input="updateGithubApi" />
</template>

<script setup lang="ts">
import { useConfigurationStore } from '../../stores/configuration/configuration'

const store = useConfigurationStore()

const updateGithubApi = (event: Event) => {
	const input = event.target as HTMLInputElement
	store.updateGithubApi(input.value)
}
</script>
