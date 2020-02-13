import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import RefreshIndicator from './refresh-indicator.vue'
import {useFakeTimers} from 'sinon'
import flushPromises from 'flush-promises'

describe('RefreshIndicator component', () => {
	let refreshIndicator, stubs

	beforeEach(() => {
		stubs = {
			clock: useFakeTimers(),
		}
		refreshIndicator = shallowMount(RefreshIndicator, {
			propsData: {
				promise: Promise.resolve('first resolution'),
			},
		})
	})

	afterEach(() => {
		stubs.clock.restore()
	})

	describe('Initialization', () => {
		it('should have the right component name', () => {
			expect(refreshIndicator.name()).to.equal('refresh-indicator')
		})
	})

	describe('Counter', () => {
		it('should display an initialized counter', () => {
			expect(refreshIndicator.find('div').text()).to.equal('0')
		})

		it('should increment the counter each seconds', async () => {
			stubs.clock.tick(1001)

			await refreshIndicator.vm.$nextTick()
			expect(refreshIndicator.find('div').text()).to.equal('1')
		})

		it('should reset counter when prop promise is changing', async () => {
			stubs.clock.tick(10000)

			await refreshIndicator.setProps({
				promise: Promise.resolve('new resolution'),
			})
			await flushPromises()

			expect(refreshIndicator.find('div').text()).to.equal('0')
		})

		it('should not reset counter while the promise is not resolved', async () => {
			stubs.clock.tick(5000)

			await refreshIndicator.setProps({
				promise: new Promise(() => {}),
			})
			await flushPromises()

			expect(refreshIndicator.find('div').text()).to.equal('5')
		})
	})
})
