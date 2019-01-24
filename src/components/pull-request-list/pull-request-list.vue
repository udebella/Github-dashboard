<template>
	<div>
		<pull-request-line
			v-for="({prTitle, prUrl, buildStatus, creationDate, statuses, commitDate, reviewDate}) in pullRequests"
			:key="prTitle"
			:has-updates="hasUpdates({commitDate, reviewDate})"
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
