<template>
	<CustomButton @click="clipboard.writeText(value)">Copy to clipboard</CustomButton>
</template>

<script lang="ts" setup>
import CustomButton from '../custom-button/custom-button.vue'
import { inject } from 'vue'

defineProps<{ value: string }>()

const clipboard = inject('clipboard', navigator.clipboard)
</script>

<style lang="css" scoped></style>
