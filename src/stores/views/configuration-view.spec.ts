import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import ConfigurationView from './configuration-view.vue'

describe('Configuration view', () => {
	let wrapper: VueWrapper
	beforeEach(() => {
		wrapper = shallowMount(ConfigurationView, {
			global: {
				renderStubDefaultSlot: true
			}
		})
	})

	describe('Request notifications button', () => {
		it('displays a button to enable notifications', () => {
			const requestNotifications = wrapper.findComponent('[data-test=request-notifications]')
			const icon = requestNotifications.findComponent({ name: 'icon-component' })

			expect(requestNotifications.text()).toBe('Enable notifications')
			expect(icon.props().icon).toBe('notifications')
		})
	})
})
