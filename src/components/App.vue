<template>
	<div class="app">
		<dashboard-header/>
		<github-api-config/>
		<repository-list class="repository-list"/>
		<pull-request-list/>
	</div>
</template>

<script>
	import DashboardHeader from './dashboard-header/dashboard-header.vue'
	import RepositoryList from './repository-list/repository-list.vue'
	import GithubApiConfig from './github-api-config/github-api-config.vue'
	import PullRequestList from './pull-request-list/pull-request-list.vue'

	export default {
		name: `App`,
		components: {
			PullRequestList,
			DashboardHeader,
			RepositoryList,
			GithubApiConfig,
		},
	}
</script>
<style src="./App.scoped.scss" scoped></style>
<style src="./App.scss"></style>
