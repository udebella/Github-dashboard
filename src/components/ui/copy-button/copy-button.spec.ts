import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import CopyButton from './copy-button.vue'
import CustomButton from '../custom-button/custom-button.vue'
import type { Mocks } from '../../../test-utils.ts'
import Icon from '../icon/icon-component.vue'

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

	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('should display the component', () => {
		expect(copyButton.findComponent(CustomButton).text()).toBe('Copy to clipboard')
	})

	it('should copy value prop to clipboard', async () => {
		await copyButton.trigger('click')

		expect(mocks.clipboard.writeText).toHaveBeenCalledWith('value to copy')
	})

	describe('Icon', () => {
		it('should display a clipboard icon', async () => {
			expect(copyButton.findComponent(CustomButton).findComponent(Icon).props()).toEqual({ icon: 'clipboard' })
		})

		it('should switch to success icon when copied', async () => {
			await copyButton.trigger('click')

			expect(copyButton.findComponent(CustomButton).findComponent(Icon).props()).toEqual({ icon: 'success' })
		})

		it('should flip back to clipboard icon after 10 seconds', async () => {
			await copyButton.trigger('click')
			await vi.advanceTimersByTime(10_000)

			expect(copyButton.findComponent(CustomButton).findComponent(Icon).props().icon).toBe('clipboard')
		})
	})
})
