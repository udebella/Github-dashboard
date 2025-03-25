<template>
	<span>Hello {{ name }} !</span>
	<CustomButton @click="isDisplayed = true">clic me !</CustomButton>
	<ul v-if="isDisplayed">
		<li>Element 1</li>
	</ul>
</template>

<script lang="ts" setup>
import CustomButton from '../custom-button/custom-button.vue'
import { ref } from 'vue'

const isDisplayed = ref(false)

defineProps<{
	name: string
}>()
</script>
