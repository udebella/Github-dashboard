<template>
	<div
		v-if="hasUpdates"
		data-test="update-icon"
		title="There are new updates">
		<font-awesome-icon
			:icon="icon"
			data-test="icon" />
	</div>
</template>

<script src="./update-icon.js"></script>
<style src="./update-icon.scss" scoped></style>
