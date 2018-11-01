<template>
	<div class="header">
		<div 
			class="title" 
			data-test="title">
			Github Dashboard
		</div>
		<div class="right">
			<configuration data-test="configuration"/>
			<login 
				class="login" 
				data-test="login"/>
			<custom-button
				title="View sources"
				target="_blank"
				href="https://github.com/udebella/Github-dashboard"
				data-test="sources"><font-awesome-icon :icon="icon"/></custom-button>
		</div>
	</div>
</template>

<script src="./dashboard-header.js"></script>
<style src="./dashboard-header.scss" scoped></style>
