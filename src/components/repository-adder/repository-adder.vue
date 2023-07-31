<template>
	<badge
		v-if="configurationStore.configurationEnabled"
		data-test="button"
		title="Watch a new repository"
		class="icon"
	>
		<!-- @vue-ignore TODO remove when all underlying component migrated to composition api -->
		<repository-picker data-test="owner-input" />
	</badge>
</template>

<script setup lang="ts">
import { useConfigurationStore } from '@/stores/configuration'
import Badge from '@/components/badge/badge.vue'
import RepositoryPicker from '@/components/repository-picker/repository-picker.vue'

const configurationStore = useConfigurationStore()
</script>

<style src="./repository-adder.scss" scoped></style>
