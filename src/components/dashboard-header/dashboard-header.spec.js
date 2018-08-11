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
			const sources = dashboardHeader.find(`[data-test=sources]`)
			const icon = sources.find({name: `font-awesome-icon`})

			expect(sources.attributes().href).to.equal(`https://github.com/udebella/Github-dashboard`)
			expect(sources.attributes().title).to.equal(`View sources`)
			expect(icon.exists()).to.be.true
			expect(icon.attributes().icon).to.be.equal(`code`)
		})
	})
})
