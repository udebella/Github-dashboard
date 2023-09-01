import { shallowMount } from '@vue/test-utils'
import CustomSelect from './custom-select.vue'
import { describe, expect, it } from 'vitest'

describe('CustomSelect component', () => {
	describe('Initialization', () => {
		it('should display a select with options', () => {
			const customSelect = shallowMount(CustomSelect, {
				propsData: { items: ['item'] }
			})

			expect(customSelect.find('[data-test=select]').exists()).toBe(true)
		})

		it('should display one option by item given in props with an empty option at the beginning', () => {
			const customSelect = shallowMount(CustomSelect, {
				propsData: { items: ['example'] }
			})

			const options = customSelect.findAll('[data-test=select] option')
			expect(options.length).toBe(2)
			expect(options[0].text()).toBe('')
			expect(options[0].attributes().value).toBe('')
			expect(options[1].text()).toBe('example')
			expect(options[1].attributes().value).toBe('example')
		})

		it('should not display anything when there is no items in the list', () => {
			const customSelect = shallowMount(CustomSelect)

			expect(customSelect.find('[data-test=select]').exists()).toBe(false)
		})
	})

	describe('Select element', () => {
		it('should send a selected event when an item is selected', () => {
			const customSelect = shallowMount(CustomSelect, {
				propsData: { items: ['example'] }
			})

			customSelect.find('[data-test=select]').setValue('example')

			expect(customSelect.emitted().selected).toEqual([['example']])
		})
	})
})