<template>
	<badge
		v-if="configurationEnabled"
		data-test="button"
		title="Watch a new repository" 
		class="icon"
		@click="clickIcon">
		<font-awesome-icon
			v-if="!displayInput"
			data-test="icon"
			icon="plus-circle"/>
		<repository-picker
			v-if="displayInput"
			data-test="owner-input"/>
	</badge>
</template>

<script src="./repository-adder.js"></script>
<style src="./repository-adder.scss" scoped></style>
