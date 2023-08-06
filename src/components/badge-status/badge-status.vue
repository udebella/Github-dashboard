<template>
	<div class="badge" :class="statusToClass[props.status ?? 'NONE']">
		<slot />
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
	status?: 'SUCCESS' | 'FAILURE' | 'PENDING'
}>()

const statusToClass = {
	NONE: undefined,
	SUCCESS: 'green',
	FAILURE: 'red',
	PENDING: 'blue'
}
</script>

<style scoped lang="css">
.badge {
	background-color: var(--color-surface);

	border-radius: 5px;
	margin: 1px;
	padding: 5px;
}

.green {
	background-color: var(--color-success);
}
.green:hover {
	background-color: var(--color-success-bright);
}

.red {
	background-color: var(--color-failure);
}
.red:hover {
	background-color: var(--color-failure-bright);
}

.blue {
	background-color: var(--color-pending);
}
.blue:hover {
	background-color: var(--color-pending-bright);
}
</style>
