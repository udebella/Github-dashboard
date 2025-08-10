<template>
	<div class="container">
		<div class="line">
			<custom-button data-test="request-notifications" @click="notificationApi.requestNotifications">
				<icon-component icon="notifications" /> Enable notifications
			</custom-button>
		</div>
		<github-api-config />
		<time-between-refresh class="line" />
		<share-configuration />
		<custom-button data-test="back" @click="router.push({ name: 'home' })">Go back</custom-button>
	</div>
</template>

<script setup lang="ts">
import CustomButton from '../components/ui/custom-button/custom-button.vue'
import IconComponent from '../components/ui/icon/icon-component.vue'
import notification from '../services/notifications/notification'
import { inject } from 'vue'
import TimeBetweenRefresh from '../components/time-between-refresh/time-between-refresh.vue'
import GithubApiConfig from '../components/github-api-config/github-api-config.vue'
import ShareConfiguration from '../components/share-configuration/share-configuration.vue'
import { useRouter } from 'vue-router'

const notificationApi = inject('notificationApi', notification)
const router = useRouter()
</script>

<style lang="css" scoped>
.container {
	padding: 16px;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	gap: 16px;
}
.line {
	display: flex;
	justify-content: space-between;
}
</style>
