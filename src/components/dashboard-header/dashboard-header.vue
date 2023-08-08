<template>
	<header class="header">
		<div class="title" data-test="title">Github Dashboard</div>
		<div class="right">
			<configuration-button data-test="configuration" />
			<login-input class="login" data-test="login" />
			<custom-button title="View sources" href="https://github.com/udebella/Github-dashboard" data-test="sources">
				<icon-component icon="github" />
			</custom-button>
		</div>
	</header>
</template>

<script lang="js" setup>
import CustomButton from '../custom-button/custom-button.vue'
import IconComponent from '../icon/icon-component.vue'
import LoginInput from '../login-input/login-input.vue'
import ConfigurationButton from '../configuration-button/configuration-button.vue'
</script>

<style lang="css" scoped>
.header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 10px 10px;
	background-color: var(--color-surface);
}
.right {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.login {
	margin-right: 10px;
	margin-left: 10px;
}

.title {
	font-size: 18px;
	font-weight: bold;
}
</style>
