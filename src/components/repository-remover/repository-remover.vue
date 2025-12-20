<template>
	<custom-button
		v-if="configurationStore.configurationEnabled"
		@click="repositoryStore.removeRepository({ name, owner })"
	>
		<icon-component :icon="icon" data-test="icon" />
	</custom-button>
</template>

<script lang="ts" setup>
import { useRepositoryStore } from '../../stores/repositories/repositories.ts'
import { useConfigurationStore } from '../../stores/configuration/configuration.ts'
import IconComponent from '../ui/icon/icon-component.vue'
import CustomButton from '../ui/custom-button/custom-button.vue'

const repositoryStore = useRepositoryStore()
const configurationStore = useConfigurationStore()

const icon = 'deleteBin'

defineProps<{
	name: string
	owner: string
}>()
</script>
