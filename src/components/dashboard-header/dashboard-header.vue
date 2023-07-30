<template>
	<header class="header">
		<div class="title" data-test="title">Github Dashboard</div>
		<div class="right">
			<configuration data-test="configuration" />
			<login class="login" data-test="login" />
			<custom-button
				title="View sources"
				href="https://github.com/udebella/Github-dashboard"
				data-test="sources"
			>
				<icon-component :icon="icon" />
			</custom-button>
		</div>
	</header>
</template>

<script src="./dashboard-header.js"></script>
<style src="./dashboard-header.scss" scoped></style>
