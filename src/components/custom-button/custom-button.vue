<template>
	<div class="button">
		<a
			v-if="url"
			:href="url"
			target="_blank"
			data-test="link">
			<slot/>
		</a>
		<slot v-else/>
	</div>
</template>

<script src="./custom-button.js"></script>
<style src="./custom-button.scss" scoped></style>
