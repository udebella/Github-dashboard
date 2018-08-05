import {shallowMount} from '@vue/test-utils'
import ListPicker from './list-picker.vue'
import {expect} from 'chai'

describe(`List-picker component`, () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallowMount(ListPicker, {propsData: {list: [`test`]}})
	})

	describe(`Initialization`, () => {
		it(`should have list required property`, () => {
			expect(wrapper.props().list).to.exist
		})
	})

	describe(`Method: tick`, () => {
		it(`should send an update event with the new value`, () => {
			// When
			wrapper.vm.tick(`testValue`)

			// Then
			expect(wrapper.emitted(`tick`).length).to.equal(1)
			expect(wrapper.emitted(`tick`)[0]).to.deep.equal([`testValue`])
		})
	})

	describe(`Method: untick`, () => {
		it(`should send an update event with the new value`, () => {
			// When
			wrapper.vm.untick(`testValue`)

			// Then
			expect(wrapper.emitted(`untick`).length).to.equal(1)
			expect(wrapper.emitted(`untick`)[0]).to.deep.equal([`testValue`])
		})
	})
})
