<template>
	<refresh-indicator
		title="Last refresh"
		:promise="promise"
		:time-between-refresh="timeBetweenRefresh" />
</template>

<script src="./network-polling.js"></script>
