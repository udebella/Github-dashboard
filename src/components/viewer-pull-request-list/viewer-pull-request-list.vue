<template>
	<div>
		<div class="head">
			<h2 data-test="title">My currently open pull requests</h2>
			<network-polling data-test="network-polling" :query="query" @http-update="updatePullRequests" />
		</div>
		<pull-request-line
			v-for="{
				buildStatus,
				creationDate,
				statuses,
				prTitle,
				prUrl,
				lastEventAuthor,
				repositoryName
			} in pullRequests"
			:key="prTitle"
			:has-updates="hasUpdates(lastEventAuthor)"
			:build-status="buildStatus"
			:creation-date="creationDate"
			:title="prTitle"
			:repository-name="repositoryName"
			:url="prUrl"
			:statuses-list="statuses"
			data-test="line"
		/>
	</div>
</template>

<script lang="ts" src="./viewer-pull-request-list.js"></script>
<style lang="css" scoped>
.head {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
</style>
