import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import GithubApiConfig from './github-api-config.vue'
import {beforeEach, describe, it} from "vitest";
import {useConfigurationStore} from "@/stores/configuration";
import {createPinia, setActivePinia} from "pinia";

describe('GithubApiConfig component', () => {
	let githubApiConfig, store

	beforeEach(() => {
		setActivePinia(createPinia())
		store = useConfigurationStore()
		// {
		// 	commit: vitest.fn(),
		// 	state: {
		// 		configurationEnabled: true,
		// 		githubApi: 'http://github-api',
		// 	},
		// }

		githubApiConfig = shallowMount(GithubApiConfig)
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(githubApiConfig.exists()).to.be.true
		})

		it('should display an input', () => {
			expect(githubApiConfig.find('input').exists()).to.be.true
		})

		it('should display as default value the one from the store', () => {
			store.$patch({githubApi: 'http://github-api'})
			githubApiConfig = shallowMount(GithubApiConfig)

			expect(githubApiConfig.find('[data-test=input]').element.value).to.equals('http://github-api')
		})

		it('should be displayed when configuration mode is enabled', () => {
			expect(githubApiConfig.find('[data-test=input]').exists()).to.be.true
		})

		it('should not be displayed when configuration mode is disabled', () => {
			store.$patch({configurationEnabled: false})
			githubApiConfig = shallowMount(GithubApiConfig)

			expect(githubApiConfig.find('[data-test=input]').exists()).to.be.false
		})
	})

	describe('Update github api', () => {
		it('should save the new api in the store when changed', () => {
			githubApiConfig.find('[data-test=input]').setValue('https://new-api')

			expect(store.githubApi).toBe('https://new-api')
		})
	})
})
