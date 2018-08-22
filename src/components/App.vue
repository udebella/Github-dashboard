<template>
	<div class="app">
		<dashboard-header/>
		<repository-list class="repository-list"/>
	</div>
</template>

<script>
	import DashboardHeader from './dashboard-header/dashboard-header.vue'
	import RepositoryList from "./repository-list/repository-list.vue"

	export default {
		name: `App`,
		components: {
			DashboardHeader,
			RepositoryList,
		},
	}
</script>
<style src="./App.scoped.scss" scoped></style>
<style src="./App.scss"></style>
