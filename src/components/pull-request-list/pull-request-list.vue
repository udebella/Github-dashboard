<template>
	<div>
		<pull-request-line
			v-for="({prTitle, prUrl, buildStatus, creationDate}) in pullRequests"
			:key="prTitle"
			:title="prTitle"
			:url="prUrl"
			:build-status="buildStatus"
			:creation-date="creationDate"
			data-test="line"/>
	</div>
</template>

<script src="./pull-request-list.js"></script>
<style src="./pull-request-list.scss" scoped></style>
