<template>
	<custom-button>
		<a
			:href="url"
			:title="description"
			:class="state"
			class="icon"
			data-test="link"
			target="_blank">
			<font-awesome-icon
				:icon="icon"
				data-test="icon" />
		</a>
	</custom-button>
</template>

<script src="./build-status.js"></script>
<style src="./build-status.scss" scoped></style>
