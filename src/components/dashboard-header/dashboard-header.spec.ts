import { shallowMount, VueWrapper } from '@vue/test-utils'
import DashboardHeader from './dashboard-header.vue'
import { beforeEach, describe, expect, it, vitest } from 'vitest'
import type { Mocks } from '../../test-utils'
import { notificationApi } from '../../services/notifications/notification'

describe('Dashboard Header component', () => {
	let dashboardHeader: VueWrapper
	let fakeNotificationApi: Mocks<ReturnType<typeof notificationApi>>

	beforeEach(() => {
		fakeNotificationApi = {
			requestNotifications: vitest.fn(),
			notify: vitest.fn()
		}
		dashboardHeader = shallowMount(DashboardHeader, {
			global: {
				provide: { notificationApi: fakeNotificationApi },
				renderStubDefaultSlot: true
			}
		})
	})

	describe('Initialization', () => {
		it('displays the component', () => {
			expect(dashboardHeader.find('[data-test=title]').text()).toBe('Github Dashboard')
		})

		it('displays a link to the sources', () => {
			const sources = dashboardHeader.find('[data-test=sources]')
			const icon = sources.findComponent({ name: 'icon-component' })

			expect(sources.attributes().href).toBe('https://github.com/udebella/Github-dashboard')
			expect(sources.attributes().title).toBe('View sources')
			expect(icon.exists()).toBe(true)
			expect(icon.attributes().icon).toBe('github')
		})

		it('displays the login component', () => {
			const login = dashboardHeader.find('[data-test=login]')

			expect(login.exists()).toBe(true)
		})

		it('displays a way to toggle configuration mode', () => {
			const configuration = dashboardHeader.find('[data-test=configuration]')

			expect(configuration.exists()).toBe(true)
		})

		it('displays a button to request notifications', () => {
			const requestNotifications = dashboardHeader.find('[data-test=requestNotifications]')

			const icon = requestNotifications.findComponent({ name: 'icon-component' })
			expect(icon.props().icon).toBe('notifications')
		})

		it('requests notifications when clicked', async () => {
			const requestNotifications = dashboardHeader.find('[data-test=requestNotifications]')

			await requestNotifications.trigger('click')

			expect(fakeNotificationApi.requestNotifications).toHaveBeenCalled()
		})
	})
})
