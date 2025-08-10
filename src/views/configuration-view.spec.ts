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

describe('Configuration view', () => {
	let wrapper: Wrapper<typeof ConfigurationView>
	let fakeNotificationApi: Mocks<Partial<ReturnType<typeof notificationApi>>>
	beforeEach(() => {
		setActivePinia(createTestingPinia())
		fakeNotificationApi = {
			requestNotifications: vitest.fn()
		}
		wrapper = shallowMount(ConfigurationView, {
			global: {
				provide: { notificationApi: fakeNotificationApi },
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

			expect(fakeNotificationApi.requestNotifications).toHaveBeenCalled()
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
})
