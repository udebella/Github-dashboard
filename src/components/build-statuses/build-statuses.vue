<template>
	<div v-if="statuses.length">
		<span v-for="({ description, jobUrl, jobStatus }, index) in statuses" :key="index">
			<build-status :description="description" :url="jobUrl" :state="jobStatus" class="build-status" />
		</span>
	</div>
</template>

<script lang="js">
import BuildStatus from '../build-status/build-status.vue'

export default {
	name: 'build-statuses',
	props: {
		statuses: {
			required: true,
			type: Array
		}
	},
	components: {
		BuildStatus
	}
}
</script>

<style lang="scss" scoped>
@import '../../global';

.build-status {
	margin: 0 5px;
}
</style>
