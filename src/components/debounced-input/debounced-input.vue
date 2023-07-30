<template>
	<input @input="debouncedInput" type="text" />
</template>

<script lang="ts" setup>
import { debounce } from 'debounce' // TODO install typings for debounce dependency

const emit = defineEmits<{
	input: string
}>()

const notifyParent = (event: Event) => {
	const target: HTMLInputElement = event.target
	emit('input', target.value)
}

const debouncedInput = debounce(notifyParent, 1000)
</script>

<style src="./debounced-input.scss" scoped></style>
