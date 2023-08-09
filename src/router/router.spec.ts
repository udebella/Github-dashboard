import { beforeEach, describe, expect, it, vitest } from 'vitest'
import type { Dependencies, RoutesNames } from './router'
import { createRouter } from './router'
import type { Router } from 'vue-router'
import type { Mocks } from '../test-utils'
import { NO_USER } from '../services/session/session'

describe('Router', () => {
	let router: Router
	let mocks: Mocks<Dependencies>
	beforeEach(() => {
		mocks = {
			connectedUser: vitest.fn()
		}
		router = createRouter(mocks)
	})

	const routes: RoutesNames[] = ['home', 'configuration', 'login']
	routes.forEach((name) => {
		it(`renders the route ${name}`, async () => {
			mocks.connectedUser.mockReturnValue({ login: 'connected user', token: 'token' })

			await router.push({ name })

			expect(router.currentRoute.value.name).toBe(name)
		})
	})

	const protectedRoutes: RoutesNames[] = ['home', 'configuration']
	protectedRoutes.forEach((name) => {
		it(`redirect to login page when trying to navigate to ${name} being unauthenticated`, async () => {
			mocks.connectedUser.mockReturnValue(NO_USER)

			await router.push({ name })

			expect(router.currentRoute.value.name).toBe('login')
		})
	})
})
