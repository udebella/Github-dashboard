<template>
	<custom-button title="Enable/Disable configuration mode" @click="toggleConfiguration">
		<icon-component :class="configurationMode" icon="configuration" data-test="icon" />
	</custom-button>
</template>

<script src="./configuration-button.js"></script>
<style src="./configuration-button.scss" scoped></style>
