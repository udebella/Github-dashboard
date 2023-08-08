<template>
	<div v-if="statuses.length">
		<span v-for="({ description, jobUrl, jobStatus }, index) in statuses" :key="index">
			<build-status :description="description" :url="jobUrl" :state="jobStatus" class="build-status" />
		</span>
	</div>
</template>

<script lang="ts" setup>
import BuildStatus from '../build-status/build-status.vue'
import type { GDBuildStatus } from '../../services/statuses/extract-statuses'

defineProps<{
	statuses: GDBuildStatus[]
}>()
</script>

<style lang="scss" scoped>
@import '../../global';

.build-status {
	margin: 0 5px;
}
</style>
