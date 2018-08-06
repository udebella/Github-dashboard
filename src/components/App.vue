<template>
	<div>
		<settings/>
		<repository-list/>
	</div>
</template>

<script>
	import settings from './settings/settings.vue'
	import RepositoryList from "./repository-list/repository-list.vue"

	export default {
		name: `App`,
		components: {
			RepositoryList,
			settings,
		},
	}
</script>
