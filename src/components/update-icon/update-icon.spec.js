import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import UpdateIcon from './update-icon.vue'
import {faEye} from '@fortawesome/free-solid-svg-icons'

describe('UpdateIcon component', () => {
	describe('Initialization', () => {
		it('should have the right component name', () => {
			const updateIcon = shallowMount(UpdateIcon, {propsData: {hasUpdates: true}})

			expect(updateIcon.name()).to.equal('update-icon')
		})
	})

	describe('Display', () => {
		it('should display an update icon', () => {
			const updateIcon = shallowMount(UpdateIcon, {propsData: {hasUpdates: true}})
			const icon = updateIcon.find('[data-test=icon]')

			expect(icon.vm.$attrs.icon).to.deep.equal(faEye)
		})

		it('should display a title explaining the purpose of the icon', () => {
			const updateIcon = shallowMount(UpdateIcon, {propsData: {hasUpdates: true}})

			expect(updateIcon.attributes().title).to.equal('There are new updates')
		})
	})
})
