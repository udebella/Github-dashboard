<template>
	<div 
		:title="title" 
		:class="displayInputToken ? 'login-failed' : 'login-success'">
		<font-awesome-icon
			data-test="icon" 
			icon="user"/>
		<input
			v-if="displayInputToken"
			v-model="inputToken"
			placeholder="Github token"
			data-test="input-token"
			type="text">
	</div>
</template>

<script src="./login.js"></script>
<style src="./login.scss" scoped></style>
