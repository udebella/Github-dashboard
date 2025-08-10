import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import PasteButton from './paste-button.vue'
import type { Wrapper } from '../../../test-utils.ts'
import CustomButton from '../custom-button/custom-button.vue'

describe('PasteButton component', () => {
	let pasteButton: Wrapper<typeof PasteButton>

	beforeEach(() => {
		pasteButton = shallowMount(PasteButton, { global: { renderStubDefaultSlot: true } })
	})

	it('displays the component', () => {
		expect(pasteButton.findComponent(CustomButton).text()).toBe('Import from clipboard')
	})
})
