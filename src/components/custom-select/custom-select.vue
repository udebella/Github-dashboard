<template>
	<select data-test="select">
		<option value=""/>
		<option 
			v-for="item in items" 
			:key="item"
			:value="item">{{ item }}</option>
	</select>
</template>

<script src="./custom-select.js"></script>
<style src="./custom-select.scss" scoped></style>
