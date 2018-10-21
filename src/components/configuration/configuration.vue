<template>
	<custom-button>
		<font-awesome-icon
			:class="configurationMode"
			data-test="icon"
			icon="cog"
			@click="toggleConfiguration"/>
	</custom-button>
</template>

<script src="./configuration.js"></script>
<style src="./configuration.scss" scoped></style>
