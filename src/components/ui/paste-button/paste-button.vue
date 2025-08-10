<template>
	<custom-button @click="pasteFromClipboard">
		Import from clipboard
		<icon v-if="pasteComplete" icon="success" />
	</custom-button>
</template>

<script lang="ts" setup>
import CustomButton from '../custom-button/custom-button.vue'
import { inject, ref } from 'vue'
import Icon from '../icon/icon-component.vue'

const emit = defineEmits<{
	paste: [string]
}>()

const clipboard = inject('clipboard', navigator.clipboard)
const pasteComplete = ref(false)

const pasteFromClipboard = async () => {
	emit('paste', await clipboard.readText())
	pasteComplete.value = true
	setTimeout(() => (pasteComplete.value = false), 5_000)
}
</script>

<style lang="css" scoped></style>
