import {shallowMount} from '@vue/test-utils'
import LivingIcon from './living-icon.vue'
import {subWeeks} from 'date-fns'
import {describe, expect, it} from "vitest";

describe('LivingIcon component', () => {
	describe('Initialization', () => {
		it('should mount properly', () => {
			const livingIcon = shallowMount(LivingIcon, {propsData: { date: new Date() }})

			expect(livingIcon.exists()).toBe(true)
		})

		it('should display a living icon', () => {
			const livingIcon = shallowMount(LivingIcon, {propsData: { date: new Date() }})
			const icon = livingIcon.findComponent('[data-test=icon]')

			expect(icon.attributes().icon).toBe('living')
		})

		it('should display a skull icon when date is one week before today', () => {
			const lastWeekDate = subWeeks(new Date(), 1)
			const livingIcon = shallowMount(LivingIcon, {propsData: { date: lastWeekDate }})
			const icon = livingIcon.findComponent('[data-test=icon]')

			expect(icon.attributes().icon).toBe('dead')
		})

		it('should display a title indicating time since given date', () => {
			const lastWeekDate = subWeeks(new Date(), 1)
			const livingIcon = shallowMount(LivingIcon, {propsData: { date: lastWeekDate }})

			expect(livingIcon.attributes().title).toBe('7 days ago')
		})
	})
})
