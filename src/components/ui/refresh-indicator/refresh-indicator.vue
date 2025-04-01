<template>
	<div data-test="counter" :class="freshness">{{ counter }}s ago</div>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{
	promise: Promise<unknown>
	timeBetweenRefresh: number
}>()

const counter = ref(0)

const freshness = computed(() => {
	if (counter.value < props.timeBetweenRefresh) {
		return 'fresh'
	}
	if (counter.value > 2 * props.timeBetweenRefresh) {
		return 'outdated'
	}
	return 'old'
})

const interval = setInterval(() => counter.value++, 1000)
watch(
	() => props.promise,
	() => props.promise.then(() => (counter.value = 0)),
	{ immediate: true }
)

onUnmounted(() => {
	clearInterval(interval)
})
</script>

<style lang="postcss" scoped>
.fresh {
	color: var(--color-success);
}
.old {
	color: var(--color-old);
}
.outdated {
	color: var(--color-failure);
}
</style>
