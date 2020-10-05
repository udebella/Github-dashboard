import {shallowMount} from '@vue/test-utils'
import {expect} from 'chai'
import {stub, useFakeTimers} from 'sinon'
import flushPomises from 'flush-promises'
import NetworkPolling from './network-polling.vue'

describe('NetworkPolling component', () => {
	let networkPolling, stubs, clock

	beforeEach(() => {
		const store = {state: {timeBetweenRefresh: 30}}
		const promise = Promise.resolve('response example')
		const requestStub = stub().returns(promise)
		clock = useFakeTimers()
		stubs = {
			requestStub,
			promise,
			store,
		}

		networkPolling = shallowMount(NetworkPolling, {
			store,
			propsData: {
				query: 'http://test-url',
				request: requestStub,
			},
		})
	})

	afterEach(() => {
		clock.restore()
	})

	describe('Initialization', () => {
		describe('Refresh display', () => {
			it('should display refresh indicator of the data', async () => {
				const indicator = networkPolling.findComponent({name: 'refresh-indicator'})

				expect(indicator.exists()).to.be.true
				expect(indicator.attributes().title).to.equal('Last refresh')
				expect(indicator.props()).to.deep.equal({promise: stubs.promise, timeBetweenRefresh: 30})
			})
		})

		it('should mount properly', () => {
			expect(networkPolling.exists()).to.be.true
		})

		it('should call the given url', () => {
			expect(stubs.requestStub).to.have.been.calledWith('http://test-url')
		})

		it('should make http call every 30 sec', () => {
			expect(stubs.requestStub.callCount).to.equal(1)
			clock.tick(29999)
			expect(stubs.requestStub.callCount).to.equal(1)
			clock.tick(1)
			expect(stubs.requestStub.callCount).to.equal(2)
		})

		it('should stop calling the url when component is not displayed anymore', () => {
			expect(stubs.requestStub.callCount).to.equal(1)

			networkPolling.destroy()
			clock.tick(999999)

			expect(stubs.requestStub.callCount).to.equal(1)
		})

		it('should call the new url immediately when props change', async () => {
			await networkPolling.setProps({
				query: 'http://new-url',
			})

			expect(stubs.requestStub).to.have.been.calledWith('http://new-url')
		})

		it('should notify parent component with response from the request', async () => {
			await flushPomises()

			expect(networkPolling.emitted()['http-update']).to.deep.equal([['response example']])
		})
	})
})
