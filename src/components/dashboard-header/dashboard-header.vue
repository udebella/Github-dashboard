<template>
	<header class="header">
		<div class="title" data-test="title">Github Dashboard</div>
		<div class="right">
			<configuration-button data-test="configuration" />
			<login-input class="login" data-test="login" />
			<custom-button title="View sources" href="https://github.com/udebella/Github-dashboard" data-test="sources">
				<icon-component :icon="icon" />
			</custom-button>
		</div>
	</header>
</template>

<script lang="js">
import CustomButton from '../custom-button/custom-button.vue'
import IconComponent from '../icon/icon-component.vue'
import LoginInput from '../login-input/login-input.vue'
import ConfigurationButton from '../configuration-button/configuration-button.vue'

export default {
	name: 'dashboard-header',
	data: () => ({
		icon: 'github'
	}),
	components: {
		IconComponent,
		LoginInput,
		CustomButton,
		ConfigurationButton
	}
}
</script>

<style src="./dashboard-header.scss" scoped></style>
