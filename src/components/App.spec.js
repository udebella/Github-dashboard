import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import App from './App.vue'

describe(`Component App`, () => {
	let app

	beforeEach(() => {
		app = shallowMount(App)
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(app.name()).to.equal(`App`)
		})

		it(`should display a header`, () => {
			expect(app.find({name: `dashboard-header`}).exists()).to.be.true
		})

		it(`should display a way to configure github api url`, () => {
			expect(app.find({name: `github-api-config`}).exists()).to.be.true
		})

		it(`should display the list of repositories`, () => {
			expect(app.find({name: `repository-list`}).exists()).to.be.true
		})
	})
})
