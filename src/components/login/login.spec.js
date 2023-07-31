import { flushPromises, shallowMount } from '@vue/test-utils'
import Login from './login.vue'
import { NO_USER } from '../../services/session/session'
import { beforeEach, describe, expect, it, vitest } from 'vitest'

describe('Login component', () => {
	let mocks

	beforeEach(() => {
		mocks = {
			userService: {
				login: vitest.fn(),
				connectedUser: vitest.fn().mockReturnValue(NO_USER)
			}
		}
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			const login = shallowMount(Login, { propsData: mocks })

			expect(login.exists()).toBe(true)
		})

		it('should display a login icon', () => {
			const login = shallowMount(Login, { propsData: mocks })
			const icon = login.findComponent('[data-test=icon]')

			expect(icon.exists()).toBe(true)
			expect(icon.attributes().icon).toBe('user')
		})

		it('should display an input text to enter token when there is no connected user in session', () => {
			const login = shallowMount(Login, {
				propsData: mocks,
				global: { renderStubDefaultSlot: true }
			})

			const inputToken = login.findComponent('[data-test=input-token]')

			expect(inputToken.exists()).toBe(true)
		})

		it('should not display the input text by default when there is a connected user in session', () => {
			mocks.userService.connectedUser.mockReturnValue({
				login: 'user',
				token: 'token'
			})
			const login = shallowMount(Login, { propsData: mocks })

			const inputToken = login.find('[data-test=input-token]')

			expect(inputToken.exists()).toBe(false)
		})

		it('should display a title indicating that user is not logged in by default', () => {
			const login = shallowMount(Login, { propsData: mocks })

			expect(login.attributes().title).to.equals('You are not logged in')
			expect(login.classes()).toEqual(['login-failed'])
		})
	})

	describe('Login', () => {
		it('should trigger a login when input changes', async () => {
			const login = shallowMount(Login, { propsData: mocks })

			await login.findComponent('[data-test=input-token]').vm.$emit('input', 'test')

			expect(mocks.userService.login).toHaveBeenCalledWith('test')
		})

		it('should use an input of type password to allow autocomplete from password managers', () => {
			const login = shallowMount(Login, { propsData: mocks })

			expect(login.find('[data-test=input-token]').attributes().type).toBe('password')
		})

		it('should hide input and display username as title on the icon when successfully logged in', async () => {
			mocks.userService.connectedUser
				.mockReturnValueOnce(NO_USER)
				.mockReturnValue({ login: 'user', token: 'token' })
			mocks.userService.login.mockReturnValue(
				Promise.resolve({ success: { login: 'user', token: 'token' } })
			)
			const login = shallowMount(Login, { propsData: mocks })

			await login.findComponent('[data-test=input-token]').vm.$emit('input', 'test')
			await flushPromises()

			expect(login.find('[data-test=input-token]').exists()).toBe(false)
			expect(login.attributes().title).toBe('Logged in as user')
			expect(login.classes()).toEqual(['login-success'])
		})
	})
})
