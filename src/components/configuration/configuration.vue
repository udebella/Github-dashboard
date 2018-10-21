<template>
	<custom-button @click="toggleConfiguration">
		<font-awesome-icon
			:class="configurationMode"
			data-test="icon"
			icon="cog"/>
	</custom-button>
</template>

<script src="./configuration.js"></script>
<style src="./configuration.scss" scoped></style>
