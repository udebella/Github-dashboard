<template>
	<div :title="connectedUser.login">
		<font-awesome-icon
			data-test="icon" 
			icon="user"/>
		<input
			v-if="displayInputToken"
			v-model="inputToken"
			data-test="input-token"
			type="text"
			@input="performLogin">
	</div>
</template>

<script src="./login.js"></script>
<style src="./login.scss" scoped></style>
