<template>
	<div>
		<pull-request-line
			v-for="pullRequest in pullRequests"
			:key="pullRequest.id"
			:title="pullRequest.prTitle"
			:url="pullRequest.prUrl"
			data-test="line"/>
	</div>
</template>

<script src="./pull-request-list.js"></script>
<style src="./pull-request-list.scss" scoped></style>
