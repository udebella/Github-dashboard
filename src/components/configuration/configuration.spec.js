import {shallowMount} from '@vue/test-utils'
import Configuration from './configuration.vue'
import {beforeEach, describe, it, vitest, expect} from "vitest";

describe('Configuration component', () => {
	let configuration, store

	beforeEach(() => {
		store = {
			state: {configurationEnabled: true},
			commit: vitest.fn(),
		}
		configuration = shallowMount(Configuration, {
			store,
			global: {
				stubs: {fontAwesomeIcon: true},
				renderStubDefaultSlot: true,
				mocks: {
					$store: store
				}
			}
		})
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(configuration.exists()).toBe(true)
		})

		it('should display a cog icon', () => {
			const icon = configuration.find('[data-test=icon]')

			expect(icon.attributes().icon).toBe("faCog")
		})

		it('should display a title to explain what the button is used for', () => {
			expect(configuration.findComponent({name: 'custom-button'}).attributes().title).toBe('Enable/Disable configuration mode')
		})

		it('should display the icon as green when the configuration mode is enabled', () => {
			const icon = configuration.find('[data-test=icon]')

			expect(icon.classes()).toContain('enabled')
		})

		it('should display the icon as red when the configuration mode is disabled', () => {
			store.state.configurationEnabled = false
			configuration = shallowMount(Configuration, { global: {
					stubs: {fontAwesomeIcon: true},
					renderStubDefaultSlot: true,
					mocks: { $store: store }}})
			const icon = configuration.find('[data-test=icon]')

			expect(icon.classes()).toContain('disabled')
		})
	})

	describe('Toggling configuration mode', () => {
		it('should toggle configuration mode when clicking the icon', () => {
			configuration.findComponent({name: 'custom-button'}).vm.$emit('click')

			expect(store.commit).toHaveBeenCalledWith('toggleConfiguration')
		})
	})
})
