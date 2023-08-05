<template>
	<div class="badge green">
		<slot />
	</div>
</template>

<script lang="ts" setup />

<style scoped lang="css">
.badge {
	background-color: var(--color-surface);

	border-radius: 5px;
	margin: 1px;
	padding: 5px;
}

/* TODO move this to props instead of classes so that it can be type-checked */
.SUCCESS {
	background-color: var(--color-success);
}

.FAILURE {
	background-color: var(--color-failure);
}

.PENDING {
	background-color: var(--color-pending);
}

.badge:hover {
	filter: brightness(150%);
}
</style>
