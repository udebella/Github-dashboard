import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import DashboardHeader from './dashboard-header.vue'

describe(`Dashboard Header component`, () => {
	let dashboardHeader

	beforeEach(() => {
		dashboardHeader = shallowMount(DashboardHeader)
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(dashboardHeader.name()).to.equal(`dashboard-header`)
		})

		it(`should display the component`, () => {
			expect(dashboardHeader.find(`[data-test=title]`).text()).to.equal(`Github Dashboard`)
		})

		it(`should display a link to the sources`, () => {
			expect(dashboardHeader.find(`[data-test=sources]`).attributes().href).to.equal(`https://github.com/udebella/Github-dashboard`)
			expect(dashboardHeader.find(`[data-test=sources]`).text()).to.equal(`View sources`)
		})
	})
})
