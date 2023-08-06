<template>
	<div :class="side" class="popover">
		<slot />
	</div>
</template>

<script lang="ts" setup>
withDefaults(
	defineProps<{
		side?: 'left' | 'right'
	}>(),
	{ side: 'right' }
)
</script>

<style lang="css" scoped>
.popover {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	background-color: var(--color-surface);
	border: 1px solid var(--color-secondaryDark);
	border-radius: 5px;
	z-index: 2;
	padding: 10px;
	box-shadow: 3px 3px 3px black;
}
.popover:before,
.popover:after {
	position: absolute;
	top: calc(50% - 10px);
	content: '';
	border: 10px solid transparent;
}

.popover.left {
	right: calc(100% + 10px);
}
.popover.left:before {
	right: -20px;
	border-left-color: var(--color-secondaryDark);
}
.popover.left:after {
	right: -19px;
	border-left-color: var(--color-surface);
}

.popover.right {
	left: calc(100% + 10px);
}
.popover.right:before {
	left: -20px;
	border-right-color: var(--color-secondaryDark);
}

.popover.right:after {
	left: -19px;
	border-right-color: var(--color-surface);
}
</style>
