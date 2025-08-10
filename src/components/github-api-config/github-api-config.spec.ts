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

	it('displays a label for the input', () => {
		expect(githubApiConfig.find('label').text()).toBe('Github api url')
	})

	it('displays an input', async () => {
		await useConfigurationStore().$patch({ githubApi: 'http://github-api' })

		expect(githubApiConfig.find('input').attributes()).toEqual({
			type: 'text',
			value: 'http://github-api'
		})
	})

	it('saves the new api in the store when changed', () => {
		githubApiConfig.find('input').setValue('https://new-api')

		expect(useConfigurationStore().githubApi).toBe('https://new-api')
	})
})
