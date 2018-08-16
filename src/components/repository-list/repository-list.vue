<template>
	<div>
		<div
			v-for="repository in repositories"
			:key="repository.name">
			<repository-line :repository="repository"/>
		</div>
		<repository-adder/>
	</div>
</template>

<script src="./repository-list.js"></script>
<style src="./repository-list.scss" scoped></style>
