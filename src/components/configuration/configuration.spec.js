import {expect} from 'chai'
import {stub} from 'sinon'
import {shallowMount} from '@vue/test-utils'
import {faCog} from '@fortawesome/free-solid-svg-icons'
import Configuration from './configuration.vue'

describe('Configuration component', () => {
	let configuration, store

	beforeEach(() => {
		store = {
			state: {configurationEnabled: true},
			commit: stub(),
		}
		configuration = shallowMount(Configuration, {store})
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(configuration.exists()).to.be.true
		})

		it('should display a cog icon', () => {
			const icon = configuration.find('[data-test=icon]')

			expect(icon.exists()).to.be.true
			expect(icon.vm.$attrs.icon).to.deep.equals(faCog)
		})

		it('should display a title to explain what the button is used for', () => {
			expect(configuration.findComponent({name: 'custom-button'}).attributes().title).to.equals('Enable/Disable configuration mode')
		})

		it('should display the icon as green when the configuration mode is enabled', () => {
			const icon = configuration.find('[data-test=icon]')

			expect(icon.classes()).to.contains('enabled')
		})

		it('should display the icon as red when the configuration mode is disabled', () => {
			store.state.configurationEnabled = false
			configuration = shallowMount(Configuration, {store})
			const icon = configuration.find('[data-test=icon]')

			expect(icon.classes()).to.contains('disabled')
		})
	})

	describe('Toggling configuration mode', () => {
		it('should toggle configuration mode when clicking the icon', () => {
			configuration.findComponent({name: 'custom-button'}).vm.$emit('click')

			expect(store.commit).to.have.been.calledWith('toggleConfiguration')
		})
	})
})
