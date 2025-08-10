import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ConfigurationView from './configuration-view.vue'
import { notificationApi } from '../services/notifications/notification'
import type { Mocks, Wrapper } from '../test-utils'
import { setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import TimeBetweenRefresh from '../components/time-between-refresh/time-between-refresh.vue'
import GithubApiConfig from '../components/github-api-config/github-api-config.vue'
import ShareConfiguration from '../components/share-configuration/share-configuration.vue'
import CustomButton from '../components/ui/custom-button/custom-button.vue'
import { routerKey } from 'vue-router'

describe('Configuration view', () => {
	let wrapper: Wrapper<typeof ConfigurationView>
	let mocks: Mocks<{
		router: { push: (name: string) => void }
		notificationApi: Pick<ReturnType<typeof notificationApi>, 'requestNotifications'>
	}>
	beforeEach(() => {
		setActivePinia(createTestingPinia())
		mocks = {
			router: { push: vitest.fn() },
			notificationApi: { requestNotifications: vitest.fn() }
		}
		wrapper = shallowMount(ConfigurationView, {
			global: {
				provide: { notificationApi: mocks.notificationApi, [routerKey]: mocks.router },
				renderStubDefaultSlot: true
			}
		})
	})

	describe('Request notifications button', () => {
		it('displays a button to enable notifications', () => {
			const requestNotifications = wrapper.findComponent('[data-test=request-notifications]')
			const icon = requestNotifications.findComponent({ name: 'icon-component' })

			expect(requestNotifications.text()).toBe('Enable notifications')
			expect(icon.props().icon).toBe('notifications')
		})

		it('requests notifications enabling when clicked', async () => {
			const requestNotifications = wrapper.findComponent('[data-test=request-notifications]')

			await requestNotifications.trigger('click')

			expect(mocks.notificationApi.requestNotifications).toHaveBeenCalled()
		})
	})

	describe('Github api config', () => {
		it('displays github api configuration', async () => {
			const githubApiConfig = wrapper.findComponent(GithubApiConfig)

			expect(githubApiConfig.exists()).toBe(true)
		})
	})

	describe('Time between refresh input', () => {
		it('displays time between refresh input', async () => {
			const timeBetweenRefresh = wrapper.findComponent(TimeBetweenRefresh)

			expect(timeBetweenRefresh.exists()).toBe(true)
		})
	})

	describe('Share configuration', () => {
		it('displays share configuration section', async () => {
			const shareConfiguration = wrapper.findComponent(ShareConfiguration)

			expect(shareConfiguration.exists()).toBe(true)
		})
	})

	describe('Back button', () => {
		it('displays a back button', async () => {
			expect(wrapper.findComponent<typeof CustomButton>('[data-test=back]').text()).toBe('Go back')
		})

		it('navigates back to home on click', async () => {
			await wrapper.findComponent<typeof CustomButton>('[data-test=back]').trigger('click')

			expect(mocks.router.push).toHaveBeenCalledWith({ name: 'home' })
		})
	})
})
