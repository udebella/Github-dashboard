import { shallowMount } from '@vue/test-utils'
import Login from './login-input.vue'
import { NO_USER } from '../../services/session/session'
import { beforeEach, describe, expect, it, vitest } from 'vitest'

describe('Login component', () => {
	let login
	let mocks

	beforeEach(() => {
		mocks = {
			userService: {
				login: vitest.fn(),
				connectedUser: vitest.fn().mockReturnValue(NO_USER)
			}
		}
		login = shallowMount(Login, {
			props: mocks,
			global: { renderStubDefaultSlot: true }
		})
	})

	it('should display an input text to enter token when there is no connected user in session', () => {
		const inputToken = login.findComponent({ name: 'debounced-input' })

		expect(inputToken.attributes().placeholder).toBe('Github token')
	})

	it('should trigger a login when input changes', async () => {
		await login.findComponent({ name: 'debounced-input' }).vm.$emit('input', 'test')

		expect(mocks.userService.login).toHaveBeenCalledWith('test')
	})

	it('should use an input of type password to allow autocomplete from password managers', () => {
		expect(login.attributes().type).toBe('password')
	})
})
