<template>
	<div :title="title" :class="displayInputToken ? 'login-failed' : 'login-success'">
		<icon-component :icon="icon" data-test="icon" />
		<debounced-input
			v-if="displayInputToken"
			placeholder="Github token"
			data-test="input-token"
			type="password"
			@input="performLogin"
		/>
	</div>
</template>

<script src="./login-input.js"></script>
<style src="./login-input.scss" scoped></style>
