import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import UpdateIcon from './update-icon.vue'
import {faEye} from '@fortawesome/free-solid-svg-icons'

describe('UpdateIcon component', () => {
	describe('Initialization', () => {
		it('should have the right component name', () => {
			const updateIcon = shallowMount(UpdateIcon)

			expect(updateIcon.name()).to.equal('update-icon')
		})

		it('should display an update icon', () => {
			const livingIcon = shallowMount(UpdateIcon)
			const icon = livingIcon.find('[data-test=icon]')

			expect(icon.vm.$attrs.icon).to.deep.equal(faEye)
		})
	})
})
