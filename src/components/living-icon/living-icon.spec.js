import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import LivingIcon from './living-icon.vue'
import {subWeeks} from 'date-fns'

describe(`LivingIcon component`, () => {
	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			const livingIcon = shallowMount(LivingIcon, {propsData: { date: new Date() }})

			expect(livingIcon.name()).to.equal(`living-icon`)
		})

		it(`should display a living icon`, () => {
			const livingIcon = shallowMount(LivingIcon, {propsData: { date: new Date() }})
			const icon = livingIcon.find(`[data-test=icon]`)

			expect(icon.attributes().icon).to.equal(`heart`)
		})

		it(`should display a skull icon when date is one week before today`, () => {
			const lastWeekDate = subWeeks(new Date(), 1)
			const livingIcon = shallowMount(LivingIcon, {propsData: { date: lastWeekDate }})
			const icon = livingIcon.find(`[data-test=icon]`)

			expect(icon.attributes().icon).to.equal(`skull`)
		})

		it(`should display a title indicating time since given date`, () => {
			const lastWeekDate = subWeeks(new Date(), 1)
			const livingIcon = shallowMount(LivingIcon, {propsData: { date: lastWeekDate }})

			expect(livingIcon.attributes().title).to.equal(`7 days ago`)
		})
	})
})
