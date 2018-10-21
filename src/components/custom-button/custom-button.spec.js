import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import CustomButton from './custom-button.vue'
import {stub, spy} from 'sinon'

describe(`CustomButton component`, () => {
	let customButton

	beforeEach(() => {
		customButton = shallowMount(CustomButton, {
			slots: {
				default: [`<span>Slot content</span>`],
			},
		})
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(customButton.name()).to.equal(`custom-button`)
		})

		it(`should display the content of the slot`, () => {
			expect(customButton.text()).to.equal(`Slot content`)
		})
	})

	describe(`Link`, () => {
		it(`should have a link when an url is given`, () => {
			customButton = shallowMount(CustomButton, {
				propsData: {href: `http://url`},
			})

			const link = customButton.find(`[data-test=link]`)
			expect(link.exists()).to.be.true
			expect(link.attributes().href).to.equals(`http://url`)
		})

		it(`should not display the link when no url is given`, () => {
			customButton = shallowMount(CustomButton)

			const link = customButton.find(`[data-test=link]`)
			expect(link.exists()).to.be.false
		})

		it(`should emit a click event when the component is clicked`, () => {
			const clickHanlder = stub()
			customButton = shallowMount(CustomButton, {propsData: {click: clickHanlder}})

			const test = spy(customButton.vm.onClick)
			customButton.trigger(`click`)

			expect(test).to.have.been.called
		})
	})
})
