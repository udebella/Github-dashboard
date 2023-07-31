import { shallowMount } from '@vue/test-utils'
import Badge from './badge.vue'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Badge component', () => {
	let badge

	beforeEach(() => {
		badge = shallowMount(Badge, {
			slots: {
				default: ['<span>Slot content</span>']
			}
		})
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(badge.exists()).toBe(true)
		})

		it('should display the content of the slot', () => {
			expect(badge.text()).toBe('Slot content')
		})
	})

	describe('click event', () => {
		it('should be clickable and send a click event', () => {
			badge.trigger('click')

			expect(badge.emitted().click).toBeDefined()
		})
	})
})
