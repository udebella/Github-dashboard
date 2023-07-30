import {flushPromises, shallowMount} from '@vue/test-utils'
import NetworkPolling from './network-polling.vue'
import {afterEach, beforeEach, describe, expect, it, vitest} from "vitest";
import {createPinia, setActivePinia} from "pinia";
import {useConfigurationStore} from "@/stores/configuration";

describe('NetworkPolling component', () => {
	let networkPolling, stubs

	beforeEach(() => {
		setActivePinia(createPinia())
		const store = useConfigurationStore()
		const promise = Promise.resolve('response example')
		const requestStub = vitest.fn().mockReturnValue(promise)
		vitest.useFakeTimers()
		stubs = {
			requestStub,
			promise,
			store,
		}

		networkPolling = shallowMount(NetworkPolling, {
			propsData: {
				query: 'http://test-url',
				request: requestStub,
			},
		})
	})

	afterEach(() => {
		vitest.restoreAllMocks()
	})

	describe('Initialization', () => {
		describe('Refresh display', () => {
			it('should display refresh indicator of the data', async () => {
				const indicator = networkPolling.findComponent({name: 'refresh-indicator'})

				expect(indicator.exists()).toBe(true)
				expect(indicator.attributes().title).toEqual('Last refresh')
				expect(indicator.props()).toEqual({promise: stubs.promise, timeBetweenRefresh: 30})
			})
		})

		it('should mount properly', () => {
			expect(networkPolling.exists()).toBe(true)
		})

		it('should call the given url', () => {
			expect(stubs.requestStub).toHaveBeenCalledWith('http://test-url')
		})

		it('should make http call every 30 sec', () => {
			expect(stubs.requestStub).toHaveBeenCalledOnce()
			vitest.advanceTimersByTime(29999)
			expect(stubs.requestStub).toHaveBeenCalledOnce()
			vitest.advanceTimersByTime(1)
			expect(stubs.requestStub).toHaveBeenCalledTimes(2)
		})

		it('should stop calling the url when component is not displayed anymore', async () => {
			expect(stubs.requestStub).toHaveBeenCalledOnce()

			await networkPolling.unmount()
			vitest.advanceTimersByTime(999999)

			expect(stubs.requestStub).toHaveBeenCalledOnce()
		})

		it('should call the new url immediately when props change', async () => {
			await networkPolling.setProps({
				query: 'http://new-url',
			})

			expect(stubs.requestStub).toHaveBeenCalledWith('http://new-url')
		})

		it('should notify parent component with response from the request', async () => {
			await flushPromises()

			expect(networkPolling.emitted()['http-update']).toEqual([['response example']])
		})
	})
})
