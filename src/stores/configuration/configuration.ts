import { defineStore } from 'pinia'

export const useConfigurationStore = defineStore('configuration', {
	state: () => ({
		githubApi: 'https://api.github.com/graphql',
		configurationEnabled: true,
		timeBetweenRefresh: 30
	}),
	actions: {
		updateGithubApi(newApi: string) {
			this.githubApi = newApi
		},
		updateTimeBetweenRefresh(timeBetweenRefresh: number) {
			this.timeBetweenRefresh = timeBetweenRefresh
		},
		toggleConfiguration() {
			this.configurationEnabled = !this.configurationEnabled
		}
	}
})
