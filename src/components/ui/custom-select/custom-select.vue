<template>
	<select v-if="items.length" data-test="select" @change="notify">
		<option disabled value="" />
		<option v-for="item in items" :key="item" :value="item">
			{{ item }}
		</option>
	</select>
</template>

<script lang="ts" setup>
withDefaults(
	defineProps<{
		items?: string[]
	}>(),
	{ items: () => [] }
)

const emit = defineEmits<{
	selected: [string]
}>()

const notify = (event: Event) => {
	const target = event.target as HTMLSelectElement
	emit('selected', target.value)
}
</script>
