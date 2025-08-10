import { beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import PasteButton from './paste-button.vue'
import type { Mocks, Wrapper } from '../../../test-utils.ts'
import CustomButton from '../custom-button/custom-button.vue'
import Icon from '../icon/icon-component.vue'

describe('PasteButton component', () => {
	let pasteButton: Wrapper<typeof PasteButton>
	let mocks: Mocks<{ clipboard: { readText: () => string } }>

	beforeEach(() => {
		mocks = { clipboard: { readText: vi.fn() } }
		pasteButton = shallowMount(PasteButton, {
			global: { renderStubDefaultSlot: true, provide: { clipboard: mocks.clipboard } }
		})
	})

	it('displays the component', () => {
		expect(pasteButton.findComponent(CustomButton).text()).toBe('Import from clipboard')
	})

	it('emits a value pasted from clipboard', async () => {
		mocks.clipboard.readText.mockResolvedValue('copied from clipboard')

		await pasteButton.trigger('click')

		expect(pasteButton.emitted('paste')).toContainEqual(['copied from clipboard'])
	})

	it('displays a success icon when pasting is complete', async () => {
		await pasteButton.trigger('click')

		expect(pasteButton.findComponent(Icon).props()).toEqual({ icon: 'success' })
	})
})
