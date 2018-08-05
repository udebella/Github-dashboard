import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import NetworkPolling from './network-polling.vue'
import {stub, useFakeTimers} from 'sinon'

describe(`NetworkPolling component`, () => {
	let wrapper, requestStub, clock

	beforeEach(() => {
		requestStub = stub().returns(`response example`)
		clock = useFakeTimers()

		wrapper = shallowMount(NetworkPolling, {
			propsData: {
				query: `http://test-url`,
				request: requestStub,
			},
		})
	})

	afterEach(() => {
		clock.restore()
	})

	describe(`Initialization`, () => {
		it(`should not display anything`, () => {
			expect(wrapper.classes()).to.deep.equal([`hidden`])
		})

		it(`should call the given url`, () => {
			expect(requestStub).to.have.been.calledWith(`http://test-url`)
		})

		it(`should make http call every 10 sec`, () => {
			expect(requestStub.callCount).to.equal(1)
			clock.tick(9999)
			expect(requestStub.callCount).to.equal(1)
			clock.tick(1)
			expect(requestStub.callCount).to.equal(2)
		})

		it(`should stop calling the url when component is not displayed anymore`, () => {
			expect(requestStub.callCount).to.equal(1)

			wrapper.destroy()
			clock.tick(10000)

			expect(requestStub.callCount).to.equal(1)
		})

		it(`should call the new url when props change`, () => {
			wrapper.setProps({
				query: `http://new-url`,
			})

			clock.tick(10000)
			expect(requestStub).to.have.been.calledWith(`http://new-url`)
		})

		it(`should notify parent component with response from the request`, (done) => {
			wrapper.vm.$nextTick(() => {
				expect(wrapper.emitted().httpUpdate).to.deep.equal([[`response example`]])
				done()
			})
		})
	})
})
