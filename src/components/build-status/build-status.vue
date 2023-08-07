<template>
	<custom-button :href="url" :title="description" :class="state" class="icon" data-test="link">
		<icon-component :icon="icon" data-test="icon" />
	</custom-button>
</template>

<script lang="js" setup>
import CustomButton from '../custom-button/custom-button.vue'
import IconComponent from '../icon/icon-component.vue'
import { computed } from 'vue'

const statusToIcon = {
	FAILURE: 'warning',
	ERROR: 'error',
	PENDING: 'pending',
	SUCCESS: 'success'
}

const props = defineProps({
	description: {
		type: String,
		required: true
	},
	url: {
		type: String
	},
	state: {
		required: true,
		type: String
	}
})

const icon = computed(() => statusToIcon[props.state])
</script>

<style lang="css" scoped>
.icon {
	text-decoration: none;
}
.icon.SUCCESS {
	color: var(--color-success);
}

.icon.FAILURE {
	color: var(--color-failure);
}

.icon.ERROR {
	color: var(--color-failure);
}

.icon.PENDING {
	color: var(--color-pending);
}
</style>
