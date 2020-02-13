import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import RefreshIndicator from './refresh-indicator.vue'

describe('RefreshIndicator component', () => {
	let refreshIndicator

	beforeEach(() => {
		refreshIndicator = shallowMount(RefreshIndicator)
	})

	describe('Initialization', () => {
		it('should have the right component name', () => {
			expect(refreshIndicator.name()).to.equal('refresh-indicator')
		})

		it('should display the component', () => {
			expect(refreshIndicator.find('div').text()).to.equal('Test component')
		})
	})
})
