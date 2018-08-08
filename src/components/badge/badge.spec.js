import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Badge from './badge.vue'

describe(`Badge component`, () => {
	let badge

	beforeEach(() => {
		badge = shallowMount(Badge, {
			slots: {
				default: [`<span>Slot content</span>`],
			},
		})
	})

	describe(`Initialization`, () => {
		it(`should have the name badge`, () => {
			expect(badge.name()).to.equals(`badge`)
		})

		it(`should display the content of the slot`, () => {
			expect(badge.text()).to.equal(`Slot content`)
		})
	})

	describe(`click event`, () => {
		it(`should be clickable and send a click event`, () => {
			badge.trigger(`click`)

			expect(badge.emitted().click).to.exist
		})
	})
})
