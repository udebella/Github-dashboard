import {shallowMount} from '@vue/test-utils'
import Popover from './popover.vue'
import {beforeEach, describe, expect, it} from "vitest";

describe('Popover component', () => {
	let popover

	beforeEach(() => {
		popover = shallowMount(Popover, {
			slots: {
				default: ['<span>Slot content</span>'],
			},
		})
	})

	describe('Initialization', () => {
		it('should have popover name', () => {
			expect(popover.exists()).toBe(true)
		})

		it('should display the component', () => {
			expect(popover.text()).toBe('Slot content')
		})

		it('should display the popover on the right by default', () => {
			expect(popover.classes()).toContain('right')
		})

		it('should allow to display the popover on the left', () => {
			popover = shallowMount(Popover, {
				propsData: {
					side: 'left',
				},
			})

			expect(popover.classes()).toContain('left')
		})
	})
})
