import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import TotoComponent from './toto.vue'
import CustomButton from '../custom-button/custom-button.vue'

describe('Toto component', () => {
	let wrapper: VueWrapper
	beforeEach(() => {
		wrapper = shallowMount(TotoComponent, {
			props: {
				name: 'Toto'
			},
			global: { renderStubDefaultSlot: true }
		})
	})

	it('should do things', () => {
		expect(wrapper.find('span').text()).toBe('Hello Toto !')
	})

	it('should do things', async () => {
		await wrapper.setProps({ name: 'Michel' })

		expect(wrapper.find('span').text()).toBe('Hello Michel !')
	})

	it('should display a button to add elements in the list', async () => {
		expect(wrapper.findComponent(CustomButton).text()).toBe('clic me !')
	})

	it('should display a button to add elements in the list', async () => {
		expect(wrapper.findComponent(CustomButton).text()).toBe('clic me !')
	})

	it('should do things', async () => {
		await clickOn(CustomButton)

		expect(wrapper.find('ul').text()).toBe('Element 1')
	})

	it('should do things', async () => {
		expect(wrapper.find('ul').exists()).toBe(false)
	})

	async function clickOn(element) {
		await wrapper.findComponent(element).trigger('click')
	}
})
