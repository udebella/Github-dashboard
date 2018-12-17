<template>
	<div>
		<pull-request-line
			v-for="({buildStatus, creationDate, statuses, prTitle, prUrl}) in pullRequests"
			:key="prTitle"
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
