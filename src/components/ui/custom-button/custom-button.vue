<template>
	<a v-if="href" :href="href" class="button" data-test="link">
		<slot />
	</a>
	<div v-else class="button" data-test="button">
		<slot />
	</div>
</template>

<script setup lang="ts">
defineProps<{
	href?: string
}>()
</script>

<style lang="css" scoped>
.button {
	background-color: var(--color-surface);

	padding: 5px;
	cursor: pointer;
	display: block;
	text-decoration: none;
}

.button:hover {
	background-color: var(--color-surface-bright);
}
</style>
