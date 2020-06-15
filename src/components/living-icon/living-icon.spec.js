import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import LivingIcon from './living-icon.vue'
import {subWeeks} from 'date-fns'
import {faHeart, faSkull} from '@fortawesome/free-solid-svg-icons'

describe('LivingIcon component', () => {
	describe('Initialization', () => {
		it('should mount properly', () => {
			const livingIcon = shallowMount(LivingIcon, {propsData: { date: new Date() }})

			expect(livingIcon.exists()).to.be.true
		})

		it('should display a living icon', () => {
			const livingIcon = shallowMount(LivingIcon, {propsData: { date: new Date() }})
			const icon = livingIcon.find('[data-test=icon]')

			expect(icon.vm.$attrs.icon).to.deep.equal(faHeart)
		})

		it('should display a skull icon when date is one week before today', () => {
			const lastWeekDate = subWeeks(new Date(), 1)
			const livingIcon = shallowMount(LivingIcon, {propsData: { date: lastWeekDate }})
			const icon = livingIcon.find('[data-test=icon]')

			expect(icon.vm.$attrs.icon).to.deep.equal(faSkull)
		})

		it('should display a title indicating time since given date', () => {
			const lastWeekDate = subWeeks(new Date(), 1)
			const livingIcon = shallowMount(LivingIcon, {propsData: { date: lastWeekDate }})

			expect(livingIcon.attributes().title).to.equal('7 days ago')
		})
	})
})
