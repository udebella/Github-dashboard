<template>
	<custom-button v-if="configurationEnabled" @click="remove">
		<icon-component :icon="icon" data-test="icon" />
	</custom-button>
</template>

<script src="./repository-remover.js"></script>
<style src="./repository-remover.scss" scoped></style>
