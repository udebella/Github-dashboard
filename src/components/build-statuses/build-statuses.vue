<template>
	<div
		v-if="statuses.length"
		class="popover">
		<span
			v-for="({context, targetUrl, state}, index) in statuses"
			:key="index">
			<build-status
				:description="context"
				:url="targetUrl"
				:state="state"
				class="build-status"/>
		</span>
	</div>
</template>

<script src="./build-statuses.js"></script>
<style src="./build-statuses.scss" scoped></style>
