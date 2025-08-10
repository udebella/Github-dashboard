import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useConfigurationStore } from './configuration'

describe('Configuration store', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})

	it('should use the public github api by default', () => {
		const store = useConfigurationStore()

		expect(store.githubApi).toBe('https://api.github.com/graphql')
	})

	it('should have configuration mode enabled by default', () => {
		const store = useConfigurationStore()

		expect(store.configurationEnabled).toBe(true)
	})

	it('should have a default time between refresh time of 30 seconds', () => {
		const store = useConfigurationStore()

		expect(store.timeBetweenRefresh).toBe(30)
	})

	describe('updateGithubApi', () => {
		it('should update the github api in the store', () => {
			const store = useConfigurationStore()

			store.updateGithubApi('http://new-api')

			expect(store.githubApi).toBe('http://new-api')
		})
	})

	describe('updateTimeBetweenRefresh', () => {
		it('should update the time between each call', () => {
			const store = useConfigurationStore()

			store.updateTimeBetweenRefresh(60)

			expect(store.timeBetweenRefresh).toBe(60)
		})
	})

	describe('toggleConfiguration', () => {
		it('should enable configuration mode when configuration is disabled', () => {
			const store = useConfigurationStore()
			store.$patch({ configurationEnabled: false })

			store.toggleConfiguration()

			expect(store.configurationEnabled).toBe(true)
		})

		it('should disable configuration mode when configuration is enabled', () => {
			const store = useConfigurationStore()
			store.$patch({ configurationEnabled: true })

			store.toggleConfiguration()

			expect(store.configurationEnabled).toBe(false)
		})
	})
})
