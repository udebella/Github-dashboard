import {shallowMount} from '@vue/test-utils'
import ListPicker from './list-picker.vue'
import {expect} from 'chai'

describe(`List-picker component`, () => {
	let listPicker

	beforeEach(() => {
		listPicker = shallowMount(ListPicker, {propsData: {list: [`test`]}})
	})

	describe(`Initialization`, () => {
		it(`should have list-picker name`, () => {
			expect(listPicker.name()).to.equals(`list-picker`)
		})

		it(`should have list required property`, () => {
			expect(listPicker.props().list).to.exist
		})
	})

	describe(`Method: tick`, () => {
		it(`should send an update event with the new value`, () => {
			// When
			listPicker.vm.tick(`testValue`)

			// Then
			expect(listPicker.emitted(`tick`).length).to.equal(1)
			expect(listPicker.emitted(`tick`)[0]).to.deep.equal([`testValue`])
		})
	})

	describe(`Method: untick`, () => {
		it(`should send an update event with the new value`, () => {
			// When
			listPicker.vm.untick(`testValue`)

			// Then
			expect(listPicker.emitted(`untick`).length).to.equal(1)
			expect(listPicker.emitted(`untick`)[0]).to.deep.equal([`testValue`])
		})
	})
})
