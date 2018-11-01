<template>
	<badge
		v-if="configurationEnabled"
		data-test="button"
		title="Watch a new repository" 
		class="icon">
		<repository-picker data-test="owner-input"/>
	</badge>
</template>

<script src="./repository-adder.js"></script>
<style src="./repository-adder.scss" scoped></style>
