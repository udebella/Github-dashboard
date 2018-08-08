<template>
	<div>
		<item-picker
			v-for="({name, selected}) in list"
			:key="name"
			:item="name"
			:selected="selected"
			data-test="item-picker"
			@tick="tick($event)"
			@untick="untick($event)"/>
	</div>
</template>

<script src="./list-picker.js"></script>
<style src="./list-picker.scss" scoped></style>
