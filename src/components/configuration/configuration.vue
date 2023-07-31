<template>
	<custom-button title="Enable/Disable configuration mode" @click="toggleConfiguration">
		<icon-component :class="configurationMode" icon="configuration" data-test="icon" />
	</custom-button>
</template>

<script src="./configuration.js"></script>
<style src="./configuration.scss" scoped></style>
