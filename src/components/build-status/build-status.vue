<template>
	<a
		:href="url"
		:title="description"
		:class="state"
		class="icon"
		target="_blank">
		<font-awesome-icon 
			:icon="icon" 
			data-test="icon" />
	</a>
</template>

<script src="./build-status.js"></script>
<style src="./build-status.scss" scoped></style>
