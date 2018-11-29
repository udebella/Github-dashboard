<template>
	<div>
		<repository-line
			v-for="repository in repositories"
			:key="repository.name"
			:repository="repository"
			data-test="repository-line"/>
		<repository-adder data-test="repository-adder"/>
	</div>
</template>

<script src="./repository-list.js"></script>
<style src="./repository-list.scss" scoped></style>
