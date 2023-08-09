import { shallowMount } from '@vue/test-utils'
import Login from './login-input.vue'
import { beforeEach, describe, expect, it, vitest } from 'vitest'

describe('Login component', () => {
	let login
	let mocks

	beforeEach(() => {
		mocks = {
			login: vitest.fn()
		}
		login = shallowMount(Login, {
			global: {
				renderStubDefaultSlot: true,
				provide: { login: mocks.login }
			}
		})
	})

	it('should display an input text to enter token when there is no connected user in session', () => {
		const inputToken = login.findComponent({ name: 'debounced-input' })

		expect(inputToken.attributes().placeholder).toBe('Github token')
	})

	it('should trigger a login when input changes', async () => {
		await login.findComponent({ name: 'debounced-input' }).vm.$emit('input', 'test')

		expect(mocks.login).toHaveBeenCalledWith('test')
	})

	it('should use an input of type password to allow autocomplete from password managers', () => {
		expect(login.attributes().type).toBe('password')
	})
})
