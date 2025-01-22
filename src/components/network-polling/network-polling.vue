<template>
	<refresh-indicator title="Last refresh" :promise="promise" :time-between-refresh="timeBetweenRefresh" />
</template>

<script lang="ts" src="./network-polling.js"></script>
