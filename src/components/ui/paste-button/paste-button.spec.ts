import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import PasteButton from './paste-button.vue'
import type { Wrapper } from '../../../test-utils.ts'

describe('PasteButton component', () => {
	let pasteButton: Wrapper<typeof PasteButton>

	beforeEach(() => {
		pasteButton = shallowMount(PasteButton)
	})

	it('displays the component', () => {
		expect(pasteButton.text()).toBe('Test component')
	})
})
