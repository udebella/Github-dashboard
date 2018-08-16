<template>
	<badge 
		title="Watch a new repository" 
		class="icon">
		<font-awesome-icon
			v-if="!displayInput"
			data-test="icon"
			icon="plus-circle"
			@click="clickIcon"/>
		<debounced-input
			v-if="displayInput"
			placeholder="Repository owner"
			data-test="owner-input"/>
	</badge>
</template>

<script src="./repository-adder.js"></script>
<style src="./repository-adder.scss" scoped></style>
