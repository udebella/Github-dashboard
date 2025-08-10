<template>
	<label data-test="time-between-refresh">
		Time to wait between refreshes (in seconds)
		<input type="number" :value="store.timeBetweenRefresh" @input="updateTimeBetweenRefresh" />
	</label>
</template>

<script lang="ts" setup>
import { useConfigurationStore } from '../../stores/configuration/configuration.ts'

const store = useConfigurationStore()

const updateTimeBetweenRefresh = (event: Event) => {
	const { value } = event.target as HTMLInputElement
	store.updateTimeBetweenRefresh(parseInt(value))
}
</script>

<style lang="css" scoped></style>
