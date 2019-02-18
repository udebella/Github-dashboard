<template>
	<div>
		<h2 data-test="title">
			My recently merged pull requests
		</h2>
		<pull-request-line
			v-for="({buildStatus, creationDate, statuses, prTitle, prUrl}) in pullRequests"
			:key="prTitle"
			:has-updates="false"
			:build-status="buildStatus"
			:creation-date="creationDate"
			:title="prTitle"
			:url="prUrl"
			:statuses-list="statuses"
			data-test="line" />
	</div>
</template>

<script src="./recently-closed-pull-requests.js"></script>
<style src="./recently-closed-pull-requests.scss" scoped></style>
