import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import CustomSelect from './custom-select.vue'

describe(`CustomSelect component`, () => {
	let customSelect

	beforeEach(() => {
		customSelect = shallowMount(CustomSelect)
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(customSelect.name()).to.equal(`custom-select`)
		})

		it(`should display the component`, () => {
			expect(customSelect.find(`div`).text()).to.equal(`Test component`)
		})
	})
})
