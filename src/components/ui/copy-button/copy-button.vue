<template>
	<custom-button @click="clipboard.writeText(value)">
		Copy to clipboard
		<icon-component icon="clipboard" />
	</custom-button>
</template>

<script lang="ts" setup>
import CustomButton from '../custom-button/custom-button.vue'
import { inject } from 'vue'
import IconComponent from '../icon/icon-component.vue'

defineProps<{ value: string }>()

const clipboard = inject('clipboard', navigator.clipboard)
</script>

<style lang="css" scoped></style>
