<template>
	<badge
		:class="state"
		@click="toggle">
		<span class="item">{{ item }}</span>
	</badge>
</template>

<script src="./item-picker.js"></script>
<style src="./item-picker.scss" scoped></style>
