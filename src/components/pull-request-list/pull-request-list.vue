<template>
	<div>
		<pull-request-line
			data-test="line"
			v-for="pullRequest in pullRequests"
			:key="pullRequest.id"
			:title="pullRequest.prTitle"
			:url="pullRequest.prUrl"/>
	</div>
</template>

<script src="./pull-request-list.js"></script>
<style src="./pull-request-list.scss" scoped></style>
