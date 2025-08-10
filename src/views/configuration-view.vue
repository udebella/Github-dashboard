<template>
	<div class="container">
		<custom-button data-test="request-notifications" @click="notificationApi.requestNotifications">
			<icon-component icon="notifications" /> Enable notifications
		</custom-button>
		<github-api-config />
		<time-between-refresh />
	</div>
</template>

<script setup lang="ts">
import CustomButton from '../components/ui/custom-button/custom-button.vue'
import IconComponent from '../components/ui/icon/icon-component.vue'
import notification from '../services/notifications/notification'
import { inject } from 'vue'
import TimeBetweenRefresh from '../components/time-between-refresh/time-between-refresh.vue'
import GithubApiConfig from '../components/github-api-config/github-api-config.vue'

const notificationApi = inject('notificationApi', notification)
</script>

<style lang="css" scoped>
.container {
	display: flex;
	flex-direction: column;
	gap: 8px;
}
</style>
