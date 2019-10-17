<template>
	<div>
		<h2 data-test="title">
			Watched repositories
		</h2>
		<network-polling
			data-test="polling"
			:query="query"
			@httpUpdate="updateRepositories" />
		<repository-line
			v-for="repository in getRepositories()"
			:key="repository.name"
			:repository="repository"
			data-test="repository-line" />
		<repository-adder data-test="repository-adder" />
	</div>
</template>

<script src="./repository-list.js"></script>
<style src="./repository-list.scss" scoped></style>
