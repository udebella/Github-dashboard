import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import ConfigurationView from './configuration-view.vue'
import { notificationApi } from '../services/notifications/notification'
import type { Mocks } from '../test-utils'
import { useConfigurationStore } from '../stores/configuration/configuration.ts'
import { setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'

describe('Configuration view', () => {
	let wrapper: VueWrapper
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

	describe('Time between refresh input', () => {
		it('displays a label for the input', async () => {
			const label = wrapper.find('label[data-test=time-between-refresh]')

			expect(label.text()).toBe('Time to wait between refreshes (in seconds)')
		})

		it('displays an input for setting time between refreshes', async () => {
			useConfigurationStore().$patch({ timeBetweenRefresh: 30 })

			const timeBetweenRefresh = wrapper.find('[data-test=time-between-refresh]').find('input')

			expect(timeBetweenRefresh.attributes()).toEqual({ type: 'number', value: '30' })
		})

		it('updates time between refresh', async () => {
			const timeBetweenRefresh = wrapper.find('[data-test=time-between-refresh]').find('input')

			await timeBetweenRefresh.setValue(60)

			expect(useConfigurationStore().updateTimeBetweenRefresh).toHaveBeenCalledWith(60)
		})
	})
})
