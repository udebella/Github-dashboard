<template>
	<div>
		<pull-request-line
			v-for="pullRequest in pullRequests"
			:key="pullRequest.prTitle"
			:title="pullRequest.prTitle"
			:url="pullRequest.prUrl"
			:build-status="pullRequest.buildStatus"
			:creation-date="pullRequest.creationDate"
			data-test="line"/>
	</div>
</template>

<script src="./pull-request-list.js"></script>
<style src="./pull-request-list.scss" scoped></style>
