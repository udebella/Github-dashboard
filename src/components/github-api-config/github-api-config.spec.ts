import { shallowMount, VueWrapper } from '@vue/test-utils'
import GithubApiConfig from './github-api-config.vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { useConfigurationStore } from '@/stores/configuration'
import { createPinia, setActivePinia } from 'pinia'

describe('GithubApiConfig component', () => {
	let githubApiConfig: VueWrapper

	beforeEach(() => {
		setActivePinia(createPinia())
		githubApiConfig = shallowMount(GithubApiConfig)
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(githubApiConfig.exists()).toBe(true)
		})

		it('should display an input', () => {
			expect(githubApiConfig.find('input').exists()).toBe(true)
		})

		it('should display as default value the one from the store', () => {
			useConfigurationStore().$patch({ githubApi: 'http://github-api' })
			githubApiConfig = shallowMount(GithubApiConfig)

			expect(githubApiConfig.find<HTMLInputElement>('[data-test=input]').element.value).toBe('http://github-api')
		})

		it('should be displayed when configuration mode is enabled', () => {
			expect(githubApiConfig.find('[data-test=input]').exists()).toBe(true)
		})

		it('should not be displayed when configuration mode is disabled', () => {
			useConfigurationStore().$patch({ configurationEnabled: false })
			githubApiConfig = shallowMount(GithubApiConfig)

			expect(githubApiConfig.find('[data-test=input]').exists()).toBe(false)
		})
	})

	describe('Update github api', () => {
		it('should save the new api in the store when changed', () => {
			githubApiConfig.find('[data-test=input]').setValue('https://new-api')

			expect(useConfigurationStore().githubApi).toBe('https://new-api')
		})
	})
})
