<template>
	<badge>
		<input
			:id="item"
			:value="item"
			type="checkbox"
			@input="notifyParent($event.target)">
		<label 
			:for="item" 
			class="item">{{ item }}</label>
	</badge>
</template>

<script src="./item-picker.js"></script>
<style src="./item-picker.scss" scoped></style>
