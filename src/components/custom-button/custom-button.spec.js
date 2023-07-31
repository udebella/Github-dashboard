import { shallowMount } from '@vue/test-utils'
import CustomButton from './custom-button.vue'
import { beforeEach, describe, it, expect } from 'vitest'

describe('CustomButton component', () => {
	let customButton

	beforeEach(() => {
		customButton = shallowMount(CustomButton, {
			slots: {
				default: ['<span>Slot content</span>']
			}
		})
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(customButton.exists()).toBe(true)
		})

		it('should display the content of the slot', () => {
			expect(customButton.text()).toBe('Slot content')
		})
	})

	describe('Link', () => {
		it('should have a link when an url is given', () => {
			customButton = shallowMount(CustomButton, {
				propsData: { href: 'http://url' }
			})

			const link = customButton.find('[data-test=link]')
			expect(link.exists()).toBe(true)
			expect(link.attributes().href).toBe('http://url')
		})

		it('should not display the link when no url is given', () => {
			customButton = shallowMount(CustomButton)

			const link = customButton.find('[data-test=link]')
			expect(link.exists()).toBe(false)
		})
	})

	describe('Button', () => {
		it('should emit a click event when the component is clicked', async () => {
			customButton = shallowMount(CustomButton)

			await customButton.find('[data-test=button]').trigger('click', { cancellable: true })

			expect(customButton.emitted().click.length).toBe(1)
		})
	})
})
