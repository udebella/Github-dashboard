<template>
	<div v-if="statuses.length">
		<span v-for="({ description, jobUrl, jobStatus }, index) in statuses" :key="index">
			<build-status
				:description="description"
				:url="jobUrl"
				:state="jobStatus"
				class="build-status"
			/>
		</span>
	</div>
</template>

<script src="./build-statuses.js"></script>
<style src="./build-statuses.scss" scoped></style>
