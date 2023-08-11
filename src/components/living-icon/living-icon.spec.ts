import { shallowMount, type VueWrapper } from '@vue/test-utils'
import LivingIcon from './living-icon.vue'
import { subWeeks } from 'date-fns'
import { beforeEach, describe, expect, it } from 'vitest'

describe('LivingIcon component', () => {
	let livingIcon: VueWrapper

	beforeEach(() => {
		livingIcon = shallowMount(LivingIcon, { propsData: { date: new Date() } })
	})

	it('displays a living icon', () => {
		const icon = livingIcon.findComponent('[data-test=icon]')

		expect(icon.attributes().icon).toBe('living')
	})

	it('displays a skull icon when date is one week before today', async () => {
		const lastWeekDate = subWeeks(new Date(), 1)
		await livingIcon.setProps({
			date: lastWeekDate
		})
		const icon = livingIcon.findComponent('[data-test=icon]')

		expect(icon.attributes().icon).toBe('dead')
	})

	it('displays a title indicating time since given date', async () => {
		const lastWeekDate = subWeeks(new Date(), 1)
		await livingIcon.setProps({
			date: lastWeekDate
		})

		expect(livingIcon.attributes().title).toBe('7 days ago')
	})
})
