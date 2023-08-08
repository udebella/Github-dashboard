import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ConfigurationView from './configuration-view.vue'

describe('Configuration view', () => {
	it('displays a button to enable notifications', () => {
		const wrapper = shallowMount(ConfigurationView)

		expect(wrapper.findComponent({ name: 'custom-button' }).exists()).toBe(true)
	})
})
