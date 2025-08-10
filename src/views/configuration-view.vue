<template>
	<custom-button data-test="request-notifications" @click="notificationApi.requestNotifications">
		<icon-component icon="notifications" /> Enable notifications
	</custom-button>
	<label data-test="time-between-refresh">
		Time to wait between refreshes (in seconds)
		<input type="number" :value="store.timeBetweenRefresh" @input="updateTimeBetweenRefresh" />
	</label>
</template>

<script setup lang="ts">
import CustomButton from '../components/ui/custom-button/custom-button.vue'
import IconComponent from '../components/ui/icon/icon-component.vue'
import notification from '../services/notifications/notification'
import { inject } from 'vue'
import { useConfigurationStore } from '../stores/configuration/configuration.ts'

const notificationApi = inject('notificationApi', notification)
const store = useConfigurationStore()

const updateTimeBetweenRefresh = (event: Event) => {
	const { value } = event.target as HTMLInputElement
	store.updateTimeBetweenRefresh(parseInt(value))
}
</script>
