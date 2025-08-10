import { describe, beforeEach, it, expect} from 'vitest'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import CopyButton from './copy-button.vue'

describe('CopyButton component', () => {
	let copyButton: VueWrapper;

	beforeEach(() => {
		copyButton = shallowMount(CopyButton)
	})

	it('should display the component', () => {
		expect(copyButton.text()).toBe('Test component')
	})
})
