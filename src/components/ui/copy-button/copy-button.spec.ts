import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import CopyButton from './copy-button.vue'
import CustomButton from '../custom-button/custom-button.vue'
import type { Mocks, Wrapper } from '../../../test-utils.ts'
import Icon from '../icon/icon-component.vue'

describe('CopyButton component', () => {
	let copyButton: Wrapper<typeof CopyButton>
	let mocks: Mocks<{ clipboard: { writeText: (text: string) => void } }>

	beforeEach(() => {
		mocks = { clipboard: { writeText: vi.fn() } }
		copyButton = shallowMount(CopyButton, {
			props: { value: 'value to copy' },
			global: { provide: { clipboard: mocks.clipboard } }
		})
	})

	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('displays the component', () => {
		expect(copyButton.findComponent(CustomButton).text()).toBe('Copy to clipboard')
	})

	it('copies value prop to clipboard', async () => {
		await copyButton.trigger('click')

		expect(mocks.clipboard.writeText).toHaveBeenCalledWith('value to copy')
	})

	describe('Icon', () => {
		it('displays a clipboard icon', async () => {
			expect(copyButton.findComponent(CustomButton).findComponent(Icon).props()).toEqual({ icon: 'clipboard' })
		})

		it('switches to success icon when copied', async () => {
			await copyButton.trigger('click')

			const icon = copyButton.findComponent(CustomButton).findComponent(Icon)
			expect(icon.props()).toEqual({ icon: 'success' })
			expect(icon.classes()).toEqual(['success'])
		})

		it('flips back to clipboard icon after 10 seconds', async () => {
			await copyButton.trigger('click')
			await vi.advanceTimersByTime(5_000)

			expect(copyButton.findComponent(CustomButton).findComponent(Icon).props().icon).toBe('clipboard')
		})
	})
})
