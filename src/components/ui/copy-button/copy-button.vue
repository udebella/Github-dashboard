<template>
	<custom-button @click="copyToClipboard">
		<icon-component :icon="state" :class="state" />
		Copy to clipboard
	</custom-button>
</template>

<script lang="ts" setup>
import CustomButton from '../custom-button/custom-button.vue'
import { inject, ref } from 'vue'
import IconComponent from '../icon/icon-component.vue'

const props = defineProps<{ value: string }>()

const clipboard = inject('clipboard', navigator.clipboard)

const state = ref<'clipboard' | 'success'>('clipboard')
const copyToClipboard = () => {
	clipboard.writeText(props.value)
	state.value = 'success'
	setTimeout(() => (state.value = 'clipboard'), 5_000)
}
</script>

<style lang="css" scoped>
.success {
	color: var(--color-success);
}
</style>
