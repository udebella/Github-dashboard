<template>
	<div>
		<debounced-input
			placeholder="Repository owner"
			data-test="owner-input"
			@input="retrieveRepositoriesFor"/>
		<custom-select
			:items="repositoriesNames"
			data-test="repository-input"
			@selected="pickRepository"/>
	</div>
</template>

<script src="./repository-picker.js"></script>
<style src="./repository-picker.scss" scoped></style>
