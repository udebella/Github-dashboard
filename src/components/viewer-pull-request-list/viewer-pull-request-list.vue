<template>
	<div>
		<h2 data-test="title">
			My currently open pull requests
		</h2>
		<pull-request-line
			v-for="({buildStatus, creationDate, statuses, prTitle, prUrl, lastEventAuthor}) in pullRequests"
			:key="prTitle"
			:has-updates="hasUpdates(lastEventAuthor)"
			:build-status="buildStatus"
			:creation-date="creationDate"
			:title="prTitle"
			:url="prUrl"
			:statuses-list="statuses"
			data-test="line" />
	</div>
</template>

<script src="./viewer-pull-request-list.js"></script>
<style src="./viewer-pull-request-list.scss" scoped></style>
