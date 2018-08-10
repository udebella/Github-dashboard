<template>
	<div class="app">
		<dashboard-header/>
		<settings/>
		<repository-list/>
	</div>
</template>

<script>
	import DashboardHeader from './dashboard-header/dashboard-header.vue'
	import Settings from './settings/settings.vue'
	import RepositoryList from "./repository-list/repository-list.vue"

	export default {
		name: `App`,
		components: {
			DashboardHeader,
			RepositoryList,
			Settings,
		},
	}
</script>
<style src="./App.scss"></style>
