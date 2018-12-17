<template>
	<a
		v-if="href"
		:href="href"
		class="button"
		target="_blank"
		data-test="link">
		<slot />
	</a>
	<div 
		v-else
		class="button"
		data-test="button"
		@click="onClick">
		<slot />
	</div>
</template>

<script src="./custom-button.js"></script>
<style src="./custom-button.scss" scoped></style>
