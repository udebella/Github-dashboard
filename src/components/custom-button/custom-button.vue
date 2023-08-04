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

<style lang="scss" scoped>
@import '../../global.scss';

.button {
	@include lightenOnHover($surface);
	padding: 5px;
	cursor: pointer;
	display: block;
}
</style>
