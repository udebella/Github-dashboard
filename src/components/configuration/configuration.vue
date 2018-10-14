<template>
	<font-awesome-icon
		:class="configurationMode"
		class="clickableIcon"
		data-test="icon"
		icon="cog"
		@click="toggleConfiguration"/>
</template>

<script src="./configuration.js"></script>
<style src="./configuration.scss" scoped></style>
