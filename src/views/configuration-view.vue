<template>
	<custom-button data-test="request-notifications" @click="notificationApi.requestNotifications">
		<icon-component icon="notifications" /> Enable notifications
	</custom-button>
	<time-between-refresh />
</template>

<script setup lang="ts">
import CustomButton from '../components/ui/custom-button/custom-button.vue'
import IconComponent from '../components/ui/icon/icon-component.vue'
import notification from '../services/notifications/notification'
import { inject } from 'vue'
import TimeBetweenRefresh from '../components/time-between-refresh/time-between-refresh.vue'

const notificationApi = inject('notificationApi', notification)
</script>
