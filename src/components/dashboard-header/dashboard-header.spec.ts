import { shallowMount } from '@vue/test-utils'
import DashboardHeader from './dashboard-header.vue'
import { beforeEach, describe, expect, it, vitest } from 'vitest'
import type { Mocks, Wrapper } from '../../test-utils'
import { notificationApi } from '../../services/notifications/notification'
import Icon from '../ui/icon/icon-component.vue'
import { routerKey } from 'vue-router'

describe('Dashboard Header component', () => {
	let dashboardHeader: Wrapper<typeof DashboardHeader>
	let fakeNotificationApi: Mocks<ReturnType<typeof notificationApi>>
	let mocks: Mocks<{ router: { push: (name: string) => void } }>

	beforeEach(() => {
		mocks = {
			router: { push: vitest.fn() }
		}
		fakeNotificationApi = {
			requestNotifications: vitest.fn(),
			notify: vitest.fn()
		}
		dashboardHeader = shallowMount(DashboardHeader, {
			global: {
				provide: { notificationApi: fakeNotificationApi, [routerKey]: mocks.router },
				renderStubDefaultSlot: true
			}
		})
	})

	it('displays the component', () => {
		expect(dashboardHeader.find('[data-test=title]').text()).toBe('Github Dashboard')
	})

	it('displays a link to the sources', () => {
		const sources = dashboardHeader.find('[data-test=sources]')
		const icon = sources.findComponent(Icon)

		expect(sources.attributes().href).toBe('https://github.com/udebella/Github-dashboard')
		expect(sources.attributes().title).toBe('View sources')
		expect(icon.exists()).toBe(true)
		expect(icon.attributes().icon).toBe('github')
	})

	it('displays a way to toggle configuration mode', () => {
		const configuration = dashboardHeader.find('[data-test=configuration]')

		expect(configuration.exists()).toBe(true)
	})

	it('displays a button to request notifications', () => {
		const requestNotifications = dashboardHeader.find('[data-test=requestNotifications]')

		const icon = requestNotifications.findComponent(Icon)
		expect(icon.props().icon).toBe('notifications')
	})

	it('requests notifications when clicked', async () => {
		const requestNotifications = dashboardHeader.find('[data-test=requestNotifications]')

		await requestNotifications.trigger('click')

		expect(fakeNotificationApi.requestNotifications).toHaveBeenCalled()
	})

	it('displays a button to navigate to configuration', () => {
		const icon = dashboardHeader.findComponent('[data-test=configuration]').findComponent(Icon)

		expect(icon.props().icon).toBe('tools')
	})

	it('navigates to configuration page on click', () => {
		dashboardHeader.findComponent('[data-test=configuration]').trigger('click')

		expect(mocks.router.push).toHaveBeenCalledWith({ name: 'configuration' })
	})
})
