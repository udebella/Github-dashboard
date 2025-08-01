<template>
	<div>
		<debounced-input placeholder="Search query" data-test="search-input" @input="retrieveRepositoriesFor" />
		<custom-select :items="repositoriesNames" data-test="repository-input" @selected="pickRepository" />
	</div>
</template>

<script lang="ts" src="./repository-picker.js"></script>
