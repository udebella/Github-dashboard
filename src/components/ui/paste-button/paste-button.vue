<template>
	<custom-button @click="pasteFromClipboard">
		Import from clipboard
		<icon icon="success" />
	</custom-button>
</template>

<script lang="ts" setup>
import CustomButton from '../custom-button/custom-button.vue'
import { inject } from 'vue'
import Icon from '../icon/icon-component.vue'

const emit = defineEmits<{
	paste: [string]
}>()

const clipboard = inject('clipboard', navigator.clipboard)

const pasteFromClipboard = async () => {
	emit('paste', await clipboard.readText())
}
</script>

<style lang="css" scoped></style>
