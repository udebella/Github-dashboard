<template>
	<div class="app">
		<dashboard-header/>
		<main-container/>
	</div>
</template>

<script>
	import DashboardHeader from './dashboard-header/dashboard-header.vue'
	import MainContainer from './main-container/main-container.vue'

	export default {
		name: `App`,
		components: {
			MainContainer,
			DashboardHeader,
		},
	}
</script>
<style src="./App.scoped.scss" scoped></style>
<style src="./App.scss"></style>
