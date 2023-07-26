import {shallowMount} from '@vue/test-utils'
import DashboardHeader from './dashboard-header.vue'
import {beforeEach, describe, expect, it} from "vitest";

describe('Dashboard Header component', () => {
	let dashboardHeader

	beforeEach(() => {
		dashboardHeader = shallowMount(DashboardHeader, { global: { renderStubDefaultSlot: true }})
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(dashboardHeader.exists()).toBe(true)
		})

		it('should display the component', () => {
			expect(dashboardHeader.find('[data-test=title]').text()).toBe('Github Dashboard')
		})

		it('should display a link to the sources', () => {
			const sources = dashboardHeader.find('[data-test=sources]')
			const icon = sources.findComponent({name: 'icon-component'})

			expect(sources.attributes().href).toBe('https://github.com/udebella/Github-dashboard')
			expect(sources.attributes().title).toBe('View sources')
			expect(icon.exists()).toBe(true)
			expect(icon.attributes().icon).toBe('github')
		})

		it('should display the login component', () => {
			const login = dashboardHeader.find('[data-test=login]')

			expect(login.exists()).toBe(true)
		})

		it('should display a way to toggle configuration mode', () => {
			const configuration = dashboardHeader.find('[data-test=configuration]')

			expect(configuration.exists()).toBe(true)
		})
	})
})
