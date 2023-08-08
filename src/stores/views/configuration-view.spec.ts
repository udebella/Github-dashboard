import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import ConfigurationView from './configuration-view.vue'
import { notificationApi } from '../../services/notifications/notification'
import type { Mocks } from '../../test-utils'

describe('Configuration view', () => {
	let wrapper: VueWrapper
	let fakeNotificationApi: Mocks<Partial<ReturnType<typeof notificationApi>>>
	beforeEach(() => {
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
})
