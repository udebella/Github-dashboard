<template>
	<div 
		:title="title" 
		:class="displayInputToken ? 'login-failed' : 'login-success'">
		<font-awesome-icon
			:icon="icon" 
			data-test="icon" />
		<debounced-input
			v-if="displayInputToken"
			placeholder="Github token"
			data-test="input-token"
			type="password"
			@input="performLogin" />
	</div>
</template>

<script src="./login.js"></script>
<style src="./login.scss" scoped></style>
