<template>
	<custom-button @click="toggleConfiguration">
		<font-awesome-icon
			:class="configurationMode"
			:icon="icon"
			data-test="icon" />
	</custom-button>
</template>

<script src="./configuration.js"></script>
<style src="./configuration.scss" scoped></style>
