<template>
	<div>
		<repository-line 
			v-for="repository in repositories"
			:key="repository.name"
			:repository="repository"/>
		<repository-adder/>
	</div>
</template>

<script src="./repository-list.js"></script>
<style src="./repository-list.scss" scoped></style>
