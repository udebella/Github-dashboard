<template>
	<div v-if="isDisplayed">
		<div
			v-for="repository in repositories"
			:key="repository.name">
			<repository-line :repository="repository"/>
		</div>
	</div>
</template>

<script src="./repository-list.js"></script>
<style src="./repository-list.scss" scoped></style>
