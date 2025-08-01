<template>
	<div class="app">
		<dashboard-header />
		<main-container />
	</div>
</template>

<script lang="ts">
import DashboardHeader from './dashboard-header/dashboard-header.vue'
import MainContainer from './ui/main-container/main-container.vue'

export default {
	name: 'App',
	components: {
		MainContainer,
		DashboardHeader
	}
}
</script>
<style src="./App.scss"></style>
<style lang="css" scoped>
.app {
	flex-grow: 1;
}
</style>

<style lang="css">
:root {
	--color-primary: #121212;
	--color-secondaryLight: #ffffff;
	--color-secondary: rgba(255, 255, 255, 0.88);
	--color-secondaryDark: rgba(255, 255, 255, 0.6);
	--color-background: #000000;
	--color-surface: rgb(35, 35, 35);
	--color-surface-bright: rgb(42, 42, 42);

	--color-success-bright: rgb(0, 154, 0);
	--color-success: rgb(0, 128, 0);
	--color-failure-bright: rgb(154, 0, 0);
	--color-failure: rgb(128, 0, 0);
	--color-pending-bright: rgb(0, 0, 154);
	--color-pending: rgb(0, 0, 128);
	--color-old: orange;
}
</style>
