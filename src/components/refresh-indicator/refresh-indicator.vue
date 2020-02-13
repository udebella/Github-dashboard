<template>
	<div
		data-test="counter"
		:class="freshness">
		{{ counter }}s ago
	</div>
</template>

<script src="./refresh-indicator.js"></script>
<style src="./refresh-indicator.scss" scoped></style>
