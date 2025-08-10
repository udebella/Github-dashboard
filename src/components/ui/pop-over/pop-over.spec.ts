import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import PopOver from './pop-over.vue'
import type { Wrapper } from '../../../test-utils.ts'

describe('Popover component', () => {
	let popover: Wrapper<typeof PopOver>

	beforeEach(() => {
		popover = shallowMount(PopOver, {
			slots: {
				default: ['<span>Slot content</span>']
			}
		})
	})

	describe('Initialization', () => {
		it('displays the slot', () => {
			expect(popover.text()).toBe('Slot content')
		})
	})

	describe('Side', () => {
		it('displays the popover on the right by default', () => {
			expect(popover.classes()).toContain('right')
		})

		it('allows to display the popover on the left', async () => {
			await popover.setProps({
				side: 'left'
			})

			expect(popover.classes()).toContain('left')
		})
	})
})
