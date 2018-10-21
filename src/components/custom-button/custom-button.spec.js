import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import CustomButton from './custom-button.vue'

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
})
