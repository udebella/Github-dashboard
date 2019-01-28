<template>
	<custom-button
		:href="url"
		:title="description"
		:class="state"
		class="icon"
		data-test="link">
		<font-awesome-icon
			:icon="icon"
			data-test="icon" />
	</custom-button>
</template>

<script src="./build-status.js"></script>
<style src="./build-status.scss" scoped></style>
