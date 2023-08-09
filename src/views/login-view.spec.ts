import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LoginView from './login-view.vue'

describe('Login view', () => {
	it('displays the name of the application', () => {
		const wrapper = shallowMount(LoginView)

		const title = wrapper.find('[data-test=title]')
		expect(title.text()).toBe('Github Dashboard')
	})

	it('displays a login input', () => {
		const wrapper = shallowMount(LoginView)

		const login = wrapper.findComponent({ name: 'login-input' })
		expect(login.exists()).toBe(true)
	})
})
