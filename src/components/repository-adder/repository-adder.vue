<template>
	<badge-status
		v-if="configurationStore.configurationEnabled"
		data-test="button"
		title="Watch a new repository"
		class="icon"
	>
		<!-- @vue-ignore TODO remove when all underlying component migrated to composition api -->
		<repository-picker data-test="owner-input" />
	</badge-status>
</template>

<script setup lang="ts">
import { useConfigurationStore } from '../../stores/configuration/configuration'
import BadgeStatus from '../ui/badge-status/badge-status.vue'
import RepositoryPicker from '../repository-picker/repository-picker.vue'

const configurationStore = useConfigurationStore()
</script>

<style lang="css" scoped>
.icon {
	text-align: center;
}
</style>
