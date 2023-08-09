import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import Login from './login-input.vue'
import { beforeEach, describe, expect, it, type Mock, vitest } from 'vitest'
import { RoutesNames } from '../../router/router'
import { routerKey } from 'vue-router'

type MockRouter = {
	push: Mock<[RoutesNames]>
}

type Mocks = {
	login: Mock
	router: MockRouter
}

describe('Login component', () => {
	let login: VueWrapper
	let mocks: Mocks

	beforeEach(() => {
		mocks = {
			login: vitest.fn(),
			router: { push: vitest.fn() }
		}
		login = shallowMount(Login, {
			global: {
				renderStubDefaultSlot: true,
				provide: { login: mocks.login, [routerKey as symbol]: mocks.router }
			}
		})
	})

	it('displays an input text to enter token when there is no connected user in session', () => {
		const inputToken = login.findComponent({ name: 'debounced-input' })

		expect(inputToken.attributes().placeholder).toBe('Github token')
	})

	it('triggers a login when input changes', async () => {
		await login.findComponent({ name: 'debounced-input' }).vm.$emit('input', 'test')

		expect(mocks.login).toHaveBeenCalledWith('test')
	})

	it('redirect to home page when login is successful', async () => {
		mocks.login.mockResolvedValue({})

		await login.findComponent({ name: 'debounced-input' }).vm.$emit('input', 'test')
		await flushPromises()

		expect(mocks.router.push).toHaveBeenCalledWith('home')
	})

	it('does not redirect when login failed', async () => {
		mocks.login.mockRejectedValue('error for tests')

		await login.findComponent({ name: 'debounced-input' }).vm.$emit('input', 'test')
		await flushPromises()

		expect(mocks.router.push).not.toHaveBeenCalled()
	})

	it('uses an input of type password to allow autocomplete from password managers', () => {
		expect(login.attributes().type).toBe('password')
	})
})
