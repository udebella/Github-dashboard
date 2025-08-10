import { shallowMount } from '@vue/test-utils'
import GithubApiConfig from './github-api-config.vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useConfigurationStore } from '../../stores/configuration/configuration'
import type { Wrapper } from '../../test-utils.ts'

describe('GithubApiConfig component', () => {
	let githubApiConfig: Wrapper<typeof GithubApiConfig>

	beforeEach(() => {
		setActivePinia(createPinia())
		githubApiConfig = shallowMount(GithubApiConfig)
	})

	describe('Initialization', () => {
		it('displays an input', () => {
			expect(githubApiConfig.attributes().type).toBe('text')
		})

		it('displays as default value the one from the store', () => {
			useConfigurationStore().$patch({ githubApi: 'http://github-api' })
			githubApiConfig = shallowMount(GithubApiConfig)

			expect(githubApiConfig.find<HTMLInputElement>('[data-test=input]').element.value).toBe('http://github-api')
		})
	})

	describe('Update github api', () => {
		it('saves the new api in the store when changed', () => {
			githubApiConfig.find('[data-test=input]').setValue('https://new-api')

			expect(useConfigurationStore().githubApi).toBe('https://new-api')
		})
	})
})
