<template>
	<div>
		<span
			data-test="date"
			title="Last update date">{{ date }}</span>
		<refresh-indicator
			title="Last refresh"
			:promise="promise" />
	</div>
</template>

<script src="./network-polling.js"></script>
