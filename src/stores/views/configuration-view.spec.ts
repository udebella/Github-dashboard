import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ConfigurationView from './configuration-view.vue'

describe('Configuration view', () => {
	it('displays a button to enable notifications', () => {
		const wrapper = shallowMount(ConfigurationView)

		const requestNotifications = wrapper.findComponent('[data-test=request-notifications]')
		expect(requestNotifications.exists()).toBe(true)
	})
})
