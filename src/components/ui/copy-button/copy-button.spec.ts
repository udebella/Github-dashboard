import { beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import CopyButton from './copy-button.vue'
import CustomButton from '../custom-button/custom-button.vue'
import type { Mocks } from '../../../test-utils.ts'

describe('CopyButton component', () => {
	let copyButton: VueWrapper
	let mocks: Mocks<{ clipboard: { writeText: (text: string) => void } }>

	beforeEach(() => {
		mocks = { clipboard: { writeText: vi.fn() } }
		copyButton = shallowMount(CopyButton, {
			props: { value: 'value to copy' },
			global: { provide: { clipboard: mocks.clipboard }, renderStubDefaultSlot: true }
		})
	})

	it('should display the component', () => {
		expect(copyButton.findComponent(CustomButton).text()).toBe('Copy to clipboard')
	})

	it('should copy value prop to clipboard', async () => {
		await copyButton.trigger('click')

		expect(mocks.clipboard.writeText).toHaveBeenCalledWith('value to copy')
	})
})
