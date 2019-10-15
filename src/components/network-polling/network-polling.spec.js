import {shallowMount} from '@vue/test-utils'
import {expect} from 'chai'
import {stub, useFakeTimers} from 'sinon'
import flushPomises from 'flush-promises'
import NetworkPolling from './network-polling.vue'

describe('NetworkPolling component', () => {
	let networkPolling, stubs, clock

	beforeEach(() => {
		const requestStub = stub().returns('response example')
		const dateGenerator = stub().returns(new Date(1234))
		clock = useFakeTimers()
		stubs = {
			requestStub,
			dateGenerator,
		}

		networkPolling = shallowMount(NetworkPolling, {
			propsData: {
				query: 'http://test-url',
				request: requestStub,
				dateGenerator,
			},
		})
	})

	afterEach(() => {
		clock.restore()
	})

	describe('Initialization', () => {
		it('should have network-polling name', () => {
			expect(networkPolling.name()).to.equals('network-polling')
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

		it('should display the date of the last http request', () => {
			const date = networkPolling.find('[data-test=date]')

			expect(date.text()).to.equals('1234')
		})

		it('should stop calling the url when component is not displayed anymore', () => {
			expect(stubs.requestStub.callCount).to.equal(1)

			networkPolling.destroy()
			clock.tick(999999)

			expect(stubs.requestStub.callCount).to.equal(1)
		})

		it('should call the new url when props change', () => {
			networkPolling.setProps({
				query: 'http://new-url',
			})

			clock.tick(30000)
			expect(stubs.requestStub).to.have.been.calledWith('http://new-url')
		})

		it('should notify parent component with response from the request', async () => {
			await flushPomises()

			expect(networkPolling.emitted().httpUpdate).to.deep.equal([['response example']])
		})
	})
})
