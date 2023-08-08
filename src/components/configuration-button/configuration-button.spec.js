import { shallowMount } from '@vue/test-utils'
import Configuration from './configuration-button.vue'
import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useConfigurationStore } from '../../stores/configuration/configuration'

describe('Configuration component', () => {
	let configuration, store

	beforeEach(() => {
		setActivePinia(
			createTestingPinia({
				createSpy: vitest.fn
			})
		)
		useConfigurationStore().$patch({
			configurationEnabled: true
		})
		configuration = shallowMount(Configuration, {
			global: {
				renderStubDefaultSlot: true
			}
		})
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(configuration.exists()).toBe(true)
		})

		it('should display a cog icon', () => {
			const icon = configuration.find('[data-test=icon]')

			expect(icon.attributes().icon).toBe('configuration')
		})

		it('should display a title to explain what the button is used for', () => {
			expect(configuration.findComponent({ name: 'custom-button' }).attributes().title).toBe(
				'Enable/Disable configuration mode'
			)
		})

		it('should display the icon as green when the configuration mode is enabled', () => {
			const icon = configuration.find('[data-test=icon]')

			expect(icon.classes()).toContain('enabled')
		})

		it('should display the icon as red when the configuration mode is disabled', () => {
			useConfigurationStore().$patch({ configurationEnabled: false })
			configuration = shallowMount(Configuration, {
				global: {
					stubs: { fontAwesomeIcon: true },
					renderStubDefaultSlot: true,
					mocks: { $store: store }
				}
			})
			const icon = configuration.find('[data-test=icon]')

			expect(icon.classes()).toContain('disabled')
		})
	})

	describe('Toggling configuration mode', () => {
		it('should toggle configuration mode when clicking the icon', () => {
			configuration.findComponent({ name: 'custom-button' }).vm.$emit('click')

			expect(useConfigurationStore().toggleConfiguration).toHaveBeenCalledWith()
		})
	})
})
