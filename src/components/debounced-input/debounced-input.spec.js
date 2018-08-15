import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import DebouncedInput from './debounced-input.vue'

describe(`DebouncedInput component`, () => {
	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			const debouncedInput = shallowMount(DebouncedInput)

			expect(debouncedInput.name()).to.equal(`debounced-input`)
		})

		it(`should display a text input`, () => {
			const debouncedInput = shallowMount(DebouncedInput)
			const input = debouncedInput.find(`input`)

			expect(input.exists()).to.be.true
			expect(input.attributes().type).to.equals(`text`)
		})
	})
})
