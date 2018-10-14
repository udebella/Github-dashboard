<template>
	<font-awesome-icon
		v-if="configurationEnabled"
		icon="trash"
		data-test="icon"
		@click="remove"/>
</template>

<script src="./repository-remover.js"></script>
<style src="./repository-remover.scss" scoped></style>
