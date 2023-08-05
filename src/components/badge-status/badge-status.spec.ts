import type { VueWrapper } from '@vue/test-utils'
import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import BadgeStatus from './badge-status.vue'

describe('Badge Status component', () => {
	let badge: VueWrapper

	beforeEach(() => {
		badge = shallowMount(BadgeStatus, {
			slots: {
				default: ['<span>Slot content</span>']
			}
		})
	})

	describe('Initialization', () => {
		it('display the content of the slot', () => {
			expect(badge.text()).toBe('Slot content')
		})

		it('does not display any color status by default', () => {
			expect(badge.classes()).toEqual(['badge'])
		})

		it('displays the badge in green when its status is success', async () => {
			await badge.setProps({
				status: 'SUCCESS'
			})

			expect(badge.classes()).toContain('green')
		})

		it('displays the badge in red when its status is failure', async () => {
			await badge.setProps({
				status: 'FAILURE'
			})

			expect(badge.classes()).toContain('red')
		})

		it('displays the badge in blue when its status is pending', async () => {
			await badge.setProps({
				status: 'PENDING'
			})

			expect(badge.classes()).toContain('blue')
		})
	})
})
