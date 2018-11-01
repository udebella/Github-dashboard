import {expect} from 'chai'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
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
			expect(icon.vm.$attrs.icon).to.deep.equal(faGithub)
		})

		it(`should display the login component`, () => {
			const login = dashboardHeader.find(`[data-test=login]`)

			expect(login.exists()).to.be.true
		})

		it(`should display a way to toggle configuration mode`, () => {
			const configuration = dashboardHeader.find(`[data-test=configuration]`)

			expect(configuration.exists()).to.be.true
		})
	})
})
