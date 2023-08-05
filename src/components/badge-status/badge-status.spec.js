import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import BadgeStatus from './badge-status.vue'

describe('Badge Status component', () => {
	let badge

	beforeEach(() => {
		badge = shallowMount(BadgeStatus, {
			slots: {
				default: ['<span>Slot content</span>']
			}
		})
	})

	describe('Initialization', () => {
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
