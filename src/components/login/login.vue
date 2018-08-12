<template>
	<div>
		<font-awesome-icon icon="user"/>
		<input
			v-if="displayInputToken"
			data-test="input-token" 
			type="text">
	</div>
</template>

<script src="./login.js"></script>
<style src="./login.scss" scoped></style>
