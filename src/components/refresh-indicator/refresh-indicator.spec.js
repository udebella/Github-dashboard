import {flushPromises, shallowMount} from '@vue/test-utils'
import RefreshIndicator from './refresh-indicator.vue'
import {afterEach, beforeEach, describe, expect, it, vitest} from "vitest";

describe('RefreshIndicator component', () => {
	let refreshIndicator

	beforeEach(() => {
		vitest.useFakeTimers()
		refreshIndicator = shallowMount(RefreshIndicator, {
			propsData: {
				promise: Promise.resolve('first resolution'),
				timeBetweenRefresh: 30,
			},
		})
	})

	afterEach(() => {
		vitest.restoreAllMocks()
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(refreshIndicator.exists()).toBe(true)
		})
	})

	describe('Counter', () => {
		it('should display an initialized counter', () => {
			expect(refreshIndicator.find('[data-test=counter]').text()).toBe('0s ago')
		})

		it('should increment the counter each seconds', async () => {
			vitest.advanceTimersByTime(1001)

			await refreshIndicator.vm.$nextTick()
			expect(refreshIndicator.find('[data-test=counter]').text()).toBe('1s ago')
		})

		it('should reset counter when prop promise is changing', async () => {
			vitest.advanceTimersByTime(10000)

			await refreshIndicator.setProps({
				promise: Promise.resolve('new resolution'),
			})
			await flushPromises()

			expect(refreshIndicator.find('[data-test=counter]').text()).toBe('0s ago')
		})

		it('should not reset counter while the promise is not resolved', async () => {
			vitest.advanceTimersByTime(5000)

			await refreshIndicator.setProps({
				promise: new Promise(() => {}),
			})
			await flushPromises()

			expect(refreshIndicator.find('[data-test=counter]').text()).toBe('5s ago')
		})

		it('should display the counter as green when it is less than timeBetweenRefresh', () => {
			expect(refreshIndicator.find('[data-test=counter]').classes()).toEqual(['fresh'])
		})

		it('should display the counter as orange when it is less than twice the timeBetweenRefresh', async () => {
			vitest.advanceTimersByTime(60000)

			await refreshIndicator.vm.$nextTick()
			expect(refreshIndicator.find('[data-test=counter]').classes()).toEqual(['old'])
		})

		it('should display the counter as red when it is more than twice the timeBetweenRefresh', async () => {
			vitest.advanceTimersByTime(61000)

			await refreshIndicator.vm.$nextTick()
			expect(refreshIndicator.find('[data-test=counter]').classes()).toEqual(['outdated'])
		})
	})
})
