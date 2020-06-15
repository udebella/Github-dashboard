import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import CustomButton from './custom-button.vue'

describe('CustomButton component', () => {
	let customButton

	beforeEach(() => {
		customButton = shallowMount(CustomButton, {
			slots: {
				default: ['<span>Slot content</span>'],
			},
		})
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(customButton.exists()).to.be.true
		})

		it('should display the content of the slot', () => {
			expect(customButton.text()).to.equal('Slot content')
		})
	})

	describe('Link', () => {
		it('should have a link when an url is given', () => {
			customButton = shallowMount(CustomButton, {
				propsData: {href: 'http://url'},
			})

			const link = customButton.find('[data-test=link]')
			expect(link.exists()).to.be.true
			expect(link.attributes().href).to.equals('http://url')
		})

		it('should not display the link when no url is given', () => {
			customButton = shallowMount(CustomButton)

			const link = customButton.find('[data-test=link]')
			expect(link.exists()).to.be.false
		})
	})

	describe('Button', () => {
		it('should emit a click event when the component is clicked', () => {
			customButton = shallowMount(CustomButton)

			customButton.find('[data-test=button]').trigger('click')

			expect(customButton.emitted().click.length).to.equals(1)
		})
	})
})
