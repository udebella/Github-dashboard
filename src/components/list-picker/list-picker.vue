<template>
	<div>
		<item-picker
			v-for="item in list"
			:key="item"
			:item="item"
			data-test="item-picker"
			@tick="tick($event)"
			@untick="untick($event)"/>
	</div>
</template>

<script src="./list-picker.js"></script>
<style src="./list-picker.scss" scoped></style>
