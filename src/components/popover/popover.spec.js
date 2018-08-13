import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Popover from './popover.vue'

describe(`Popover component`, () => {
	let popover

	beforeEach(() => {
		popover = shallowMount(Popover, {
			slots: {
				default: [`<span>Slot content</span>`],
			},
		})
	})

	describe(`Initialization`, () => {
		it(`should have popover name`, () => {
			expect(popover.name()).to.equals(`popover`)
		})

		it(`should display the component`, () => {
			expect(popover.text()).to.equal(`Slot content`)
		})
	})
})
