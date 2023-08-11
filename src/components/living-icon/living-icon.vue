<template>
	<div :title="title">
		<icon-component :icon="icon" data-test="icon" />
	</div>
</template>

<script lang="js" setup>
import { differenceInWeeks, formatDistanceToNow } from 'date-fns'
import IconComponent from '../icon/icon-component.vue'
import { computed } from 'vue'

const props = defineProps({
	date: {
		type: Date,
		required: true
	}
})

const title = computed(() => formatDistanceToNow(props.date, { addSuffix: true }))
const icon = computed(() => (differenceInWeeks(new Date(), props.date) < 1 ? 'living' : 'dead'))
</script>
