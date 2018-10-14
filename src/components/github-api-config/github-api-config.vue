<template>
	<input
		v-if="configurationEnabled"
		v-model="inputValue"
		type="text"
		data-test="input"
		@input="updateGithubApi">
</template>

<script src="./github-api-config.js"></script>
<style src="./github-api-config.scss" scoped></style>
