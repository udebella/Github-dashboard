<template>
	<select v-if="items.length" v-model="selected" data-test="select" @change="notify">
		<option disabled value="" />
		<option v-for="item in items" :key="item" :value="item">
			{{ item }}
		</option>
	</select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

withDefaults(
	defineProps<{
		items?: string[]
	}>(),
	{ items: () => [] }
)

const emit = defineEmits<{
	selected: [string]
}>()

const selected = ref('')
const notify = () => {
	emit('selected', selected.value)
}
</script>
