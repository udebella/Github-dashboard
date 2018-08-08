import {shallowMount} from '@vue/test-utils'
import ItemPicker from './item-picker.vue'
import {expect} from 'chai'

describe(`Item-picker component`, () => {
	let itemPicker

	beforeEach(() => {
		itemPicker = shallowMount(ItemPicker, {propsData: {item: `test`}})
	})

	describe(`Initialization`, () => {
		it(`should have item-picker name`, () => {
			expect(itemPicker.name()).to.equals(`item-picker`)
		})

		it(`should display the label of the item`, () => {
			expect(itemPicker.find(`label`).text()).to.equal(`test`)
		})
	})

	describe(`notifyParent`, () => {
		it(`should send a tick event when item is checked`, () => {
			// Given
			const check = itemPicker.find(`input`)

			// When
			check.element.checked = true
			check.trigger(`input`)

			// Then
			expect(itemPicker.emitted(`tick`).length).to.equal(1)
			expect(itemPicker.emitted(`tick`)[0]).to.deep.equal([`test`])
		})

		it(`should send an untick event when item is not checked`, () => {
			// Given
			const check = itemPicker.find(`input`)

			// When
			check.element.checked = false
			check.trigger(`input`)

			// Then
			expect(itemPicker.emitted(`untick`).length).to.equal(1)
			expect(itemPicker.emitted(`untick`)[0]).to.deep.equal([`test`])
		})
	})
})
