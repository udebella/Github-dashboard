import { shallowMount } from '@vue/test-utils'
import CustomButton from './custom-button.vue'
import { beforeEach, describe, expect, it } from 'vitest'
import type { Wrapper } from '../../../test-utils.ts'

describe('CustomButton component', () => {
	let customButton: Wrapper<typeof CustomButton>

	beforeEach(() => {
		customButton = shallowMount(CustomButton, {
			slots: {
				default: '<span>Slot content</span>'
			}
		})
	})

	describe('Initialization', () => {
		it('should display the content of the slot', () => {
			expect(customButton.text()).toBe('Slot content')
		})
	})

	describe('Link', () => {
		it('should have a link when an url is given', async () => {
			await customButton.setProps({
				href: 'http://url'
			})

			const link = customButton.find('[data-test=link]')
			expect(link.attributes().href).toBe('http://url')
		})

		it('should not display the link when no url is given', async () => {
			await customButton.setProps({ href: undefined })

			const link = customButton.find('[data-test=link]')
			expect(link.exists()).toBe(false)
		})
	})

	describe('Button', () => {
		it('should emit a click event when the component is clicked', async () => {
			await customButton.find('[data-test=button]').trigger('click')

			expect(customButton.emitted().click).toHaveLength(1)
		})
	})
})
