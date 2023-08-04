<template>
	<div class="badge" @click="emits('click')">
		<slot />
	</div>
</template>

<script lang="ts" setup>
const emits = defineEmits<{
	click: [void]
}>()
</script>

<style src="./badge-status.scss" scoped></style>
