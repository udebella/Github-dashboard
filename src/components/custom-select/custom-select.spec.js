import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import CustomSelect from './custom-select.vue'

describe('CustomSelect component', () => {
	describe('Initialization', () => {
		it('should mount properly', () => {
			const customSelect = shallowMount(CustomSelect)

			expect(customSelect.exists()).to.be.true
		})

		it('should display a select with options', () => {
			const customSelect = shallowMount(CustomSelect, {
				propsData: {items: ['item']},
			})

			expect(customSelect.find('[data-test=select]').exists()).to.be.true
		})

		it('should display one option by item given in props with an empty option at the beginning', () => {
			const customSelect = shallowMount(CustomSelect, {
				propsData: {items: ['example']},
			})

			expect(customSelect.findAll('[data-test=select] option').length).to.equals(2)
			expect(customSelect.findAll('[data-test=select] option').at(0).text()).to.equals('')
			expect(customSelect.findAll('[data-test=select] option').at(0).attributes().value).to.equals('')
			expect(customSelect.findAll('[data-test=select] option').at(1).text()).to.equals('example')
			expect(customSelect.findAll('[data-test=select] option').at(1).attributes().value).to.equals('example')
		})

		it('should not display anything when there is no items in the list', () => {
			const customSelect = shallowMount(CustomSelect)

			expect(customSelect.find('[data-test=select]').exists()).to.be.false
		})
	})

	describe('Select element', () => {
		it('should send a selected event when an item is selected', () => {
			const customSelect = shallowMount(CustomSelect, {
				propsData: {items: ['example']},
			})

			customSelect.findAll('[data-test=select] option').at(1).setSelected()

			expect(customSelect.emitted('selected')).to.deep.equals([['example']])
		})
	})
})
