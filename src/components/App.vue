<template>
	<div class="app">
		<dashboard-header />
		<main-container />
	</div>
</template>

<script>
import DashboardHeader from './dashboard-header/dashboard-header.vue'
import MainContainer from './main-container/main-container.vue'

export default {
	name: 'App',
	components: {
		MainContainer,
		DashboardHeader
	}
}
</script>
<style src="./App.scoped.scss" scoped></style>
<style src="./App.scss"></style>
<style>
:root {
	--color-primary: #121212;
	--color-secondaryLight: #ffffff;
	--color-secondary: rgba(255, 255, 255, 0.88);
	--color-secondaryDark: rgba(255, 255, 255, 0.6);
	--color-background: #000000;
	--color-surface: #232323;

	--color-success: green;
	--color-failure: red;
	--color-pending: #120262;
	--color-old: orange;
}
</style>
