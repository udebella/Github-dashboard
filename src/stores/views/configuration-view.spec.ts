import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import ConfigurationView from './configuration-view.vue'

describe('Configuration view', () => {
	let wrapper: VueWrapper
	beforeEach(() => {
		wrapper = shallowMount(ConfigurationView)
	})

	describe('Request notifications button', () => {
		it('displays a button to enable notifications', () => {
			const requestNotifications = wrapper.findComponent('[data-test=request-notifications]')

			expect(requestNotifications.exists()).toBe(true)
		})
	})
})
