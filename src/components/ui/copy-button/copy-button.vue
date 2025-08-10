<template>
	<custom-button @click="copyToClipboard">
		Copy to clipboard
		<icon-component :icon="copied ? 'success' : 'clipboard'" />
	</custom-button>
</template>

<script lang="ts" setup>
import CustomButton from '../custom-button/custom-button.vue'
import { inject, ref } from 'vue'
import IconComponent from '../icon/icon-component.vue'

const props = defineProps<{ value: string }>()

const clipboard = inject('clipboard', navigator.clipboard)

const copied = ref(false)
const copyToClipboard = () => {
	clipboard.writeText(props.value)
	copied.value = true
	setTimeout(() => (copied.value = false), 5_000)
}
</script>

<style lang="css" scoped></style>
