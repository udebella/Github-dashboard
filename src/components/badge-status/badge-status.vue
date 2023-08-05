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

/* TODO removes SUCCESS, FAILURE and PENDING classes when everything is using props */
.SUCCESS,
.green {
	background-color: var(--color-success);
}

.FAILURE,
.red {
	background-color: var(--color-failure);
}

.PENDING,
.blue {
	background-color: var(--color-pending);
}

.badge:hover {
	filter: brightness(150%);
}
</style>
