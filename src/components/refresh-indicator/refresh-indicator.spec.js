import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import RefreshIndicator from './refresh-indicator.vue'
import {useFakeTimers} from 'sinon'

describe('RefreshIndicator component', () => {
	let refreshIndicator, stubs

	beforeEach(() => {
		stubs = {
			clock: useFakeTimers(),
		}
		refreshIndicator = shallowMount(RefreshIndicator)
	})

	afterEach(() => {
		stubs.clock.restore()
	})

	describe('Initialization', () => {
		it('should have the right component name', () => {
			expect(refreshIndicator.name()).to.equal('refresh-indicator')
		})

		it('should an initialized counter', () => {
			expect(refreshIndicator.find('div').text()).to.equal('0')
		})

		it('should increment the counter each seconds', async () => {
			stubs.clock.tick(1001)

			await refreshIndicator.vm.$nextTick()
			expect(refreshIndicator.find('div').text()).to.equal('1')
		})
	})
})
