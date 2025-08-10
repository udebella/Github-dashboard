<template>
	<header class="header">
		<div class="title" data-test="title">Github Dashboard</div>
		<div class="right">
			<custom-button data-test="configuration">
				<icon icon="tools" />
			</custom-button>
			<custom-button data-test="requestNotifications" @click="notifications.requestNotifications">
				<icon icon="notifications" />
			</custom-button>
			<!-- @vue-ignore TODO remove when migrated to composition api -->
			<configuration-button data-test="configuration" />
			<custom-button title="View sources" href="https://github.com/udebella/Github-dashboard" data-test="sources">
				<icon icon="github" />
			</custom-button>
		</div>
	</header>
</template>

<script lang="ts" setup>
import CustomButton from '../ui/custom-button/custom-button.vue'
import Icon from '../ui/icon/icon-component.vue'
import ConfigurationButton from '../configuration-button/configuration-button.vue'
import { inject } from 'vue'
import notificationApi from '../../services/notifications/notification'

const notifications = inject('notificationApi', notificationApi)
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
.title {
	font-size: 18px;
	font-weight: bold;
}
</style>
