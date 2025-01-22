<template>
	<div data-test="counter" :class="freshness">{{ counter }}s ago</div>
</template>

<script lang="ts" src="./refresh-indicator.js"></script>
<style src="./refresh-indicator.scss" scoped></style>
