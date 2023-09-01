<template>
	<custom-button title="Enable/Disable configuration mode" @click="toggleConfiguration">
		<icon-component :class="configurationMode" icon="configuration" data-test="icon" />
	</custom-button>
</template>

<script>
import CustomButton from '../ui/custom-button/custom-button.vue'
import { useConfigurationStore } from '../../stores/configuration/configuration'
import IconComponent from '../ui/icon/icon-component.vue'

export default {
	setup() {
		const configurationStore = useConfigurationStore()
		return { configurationStore }
	},
	name: 'configuration-button',
	computed: {
		configurationMode() {
			return this.configurationStore.configurationEnabled ? 'enabled' : 'disabled'
		}
	},
	methods: {
		toggleConfiguration() {
			this.configurationStore.toggleConfiguration()
		}
	},
	components: {
		IconComponent,
		CustomButton
	}
}
</script>

<style lang="scss" scoped>
@import '../../global';

.enabled {
	color: $success;
}

.disabled {
	color: $failure;
}
</style>
