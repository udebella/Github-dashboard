import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ConfigurationView from './configuration-view.vue'

describe('Configuration view', () => {
	it('displays properly', () => {
		const wrapper = shallowMount(ConfigurationView)

		expect(wrapper.exists()).toBe(true)
	})
})
