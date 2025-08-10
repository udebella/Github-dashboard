import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import CopyButton from './copy-button.vue'
import CustomButton from '../custom-button/custom-button.vue'

describe('CopyButton component', () => {
	let copyButton: VueWrapper

	beforeEach(() => {
		copyButton = shallowMount(CopyButton, {
			global: { renderStubDefaultSlot: true }
		})
	})

	it('should display the component', () => {
		expect(copyButton.findComponent(CustomButton).text()).toBe('Copy to clipboard')
	})
})
