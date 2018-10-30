import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import LivingIcon from './living-icon.vue'

describe(`LivingIcon component`, () => {
	let livingIcon

	beforeEach(() => {
		livingIcon = shallowMount(LivingIcon)
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(livingIcon.name()).to.equal(`living-icon`)
		})

		it(`should display the component`, () => {
			expect(livingIcon.find(`div`).text()).to.equal(`Test component`)
		})
	})
})
