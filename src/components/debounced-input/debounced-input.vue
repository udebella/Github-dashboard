<template>
	<input @input="debouncedInput" type="text" />
</template>

<script lang="ts" setup>
import { debounce } from 'debounce'

const emit = defineEmits<{
	input: [string]
}>()

const notifyParent = (event: Event) => {
	const target = event.target as HTMLInputElement
	emit('input', target.value)
}

const debouncedInput = debounce(notifyParent, 1000)
</script>

<style src="./debounced-input.scss" scoped></style>
