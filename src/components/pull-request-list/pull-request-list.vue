<template>
	<div>
		<h2 data-test="title">
			Pull requests on watched repositories
		</h2>
		<network-polling
			data-test="network-polling"
			:query="query" />
		<pull-request-line
			v-for="({prTitle, prUrl, buildStatus, creationDate, statuses, lastEventAuthor}) in tempGetPullRequests()"
			:key="prTitle"
			:has-updates="hasUpdates(lastEventAuthor)"
			:title="prTitle"
			:url="prUrl"
			:build-status="buildStatus"
			:creation-date="creationDate"
			:statuses-list="statuses"
			data-test="line" />
	</div>
</template>

<script src="./pull-request-list.js"></script>
<style src="./pull-request-list.scss" scoped></style>
