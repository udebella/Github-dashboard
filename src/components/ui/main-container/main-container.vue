<template>
	<div class="container">
		<github-api-config class="configuration" />
		<div class="columns">
			<repository-list class="repository-list" />
			<pull-request-list class="pull-request-list" />
			<div class="viewer-pull-request-list">
				<viewer-pull-request-list />
				<recently-closed-pull-requests />
			</div>
		</div>
	</div>
</template>

<script src="./main-container.js"></script>
<style src="./main-container.scss" scoped></style>
