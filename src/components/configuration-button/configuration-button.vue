<template>
	<custom-button title="Enable/Disable configuration mode" @click="configurationStore.toggleConfiguration">
		<icon-component :class="configurationMode" icon="configuration" />
	</custom-button>
</template>

<script lang="ts" setup>
import CustomButton from '../ui/custom-button/custom-button.vue'
import { useConfigurationStore } from '../../stores/configuration/configuration'
import IconComponent from '../ui/icon/icon-component.vue'
import { computed } from 'vue'

const configurationStore = useConfigurationStore()

const configurationMode = computed(() => (configurationStore.configurationEnabled ? 'enabled' : 'disabled'))
</script>

<style lang="css" scoped>
.enabled {
	color: var(--color-success);
}

.disabled {
	color: var(--color-failure);
}
</style>
