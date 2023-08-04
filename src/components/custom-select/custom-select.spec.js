import { shallowMount } from '@vue/test-utils'
import CustomSelect from './custom-select.vue'
import { describe, it, expect } from 'vitest'

describe('CustomSelect component', () => {
	describe('Initialization', () => {
		it('should mount properly', () => {
			const customSelect = shallowMount(CustomSelect)

			expect(customSelect.exists()).toBe(true)
		})

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

			expect(customSelect.findAll('[data-test=select] option').length).toBe(2)
			expect(customSelect.findAll('[data-test=select] option').at(0).text()).toBe('')
			expect(customSelect.findAll('[data-test=select] option').at(0).attributes().value).toBe('')
			expect(customSelect.findAll('[data-test=select] option').at(1).text()).toBe('example')
			expect(customSelect.findAll('[data-test=select] option').at(1).attributes().value).toBe('example')
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

			customSelect.findAll('[data-test=select] option').at(1).setSelected()

			expect(customSelect.emitted().selected).toEqual([['example']])
		})
	})
})
