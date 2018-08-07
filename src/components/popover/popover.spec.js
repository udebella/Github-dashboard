import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Popover from './popover.vue'

describe(`Popover component`, () => {
	describe(`Initialization`, () => {
		it(`should display the component`, () => {
			const wrapper = shallowMount(Popover, {
				slots: {
					default: [`<span>Slot content</span>`],
				},
			})

			expect(wrapper.text()).to.equal(`Slot content`)
		})
	})
})
