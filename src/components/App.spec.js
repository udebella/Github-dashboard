import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import App from './App.vue'

describe('Component App', () => {
	let app

	beforeEach(() => {
		app = shallowMount(App)
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(app.exists()).to.be.true
		})

		it('should display a header', () => {
			expect(app.findComponent({name: 'dashboard-header'}).exists()).to.be.true
		})

		it('should display the main container', () => {
			expect(app.findComponent({name: 'main-container'}).exists()).to.be.true
		})
	})
})
