import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LoginView from './LoginView.vue'

describe('Login view', () => {
	it('works', () => {
		const wrapper = shallowMount(LoginView)

		expect(wrapper.exists()).toBe(true)
	})
})
