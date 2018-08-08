<template>
	<div class="app">
		<settings/>
		<repository-list/>
	</div>
</template>

<script>
	import Settings from './settings/settings.vue'
	import RepositoryList from "./repository-list/repository-list.vue"

	export default {
		name: `App`,
		components: {
			RepositoryList,
			Settings,
		},
	}
</script>
<style src="./App.scss"></style>
