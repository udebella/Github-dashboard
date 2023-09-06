import { buildSessionService, NO_USER, type Storage } from './session'
import { beforeEach, describe, expect, it, vitest } from 'vitest'
import type { Mocks } from '../../test-utils'

describe('Session service', () => {
	let sessionService: ReturnType<typeof buildSessionService>
	let fakeSessionStorage: Mocks<Storage>

	beforeEach(() => {
		fakeSessionStorage = {
			setItem: vitest.fn(),
			getItem: vitest.fn(),
			removeItem: vitest.fn()
		}

		sessionService = buildSessionService(fakeSessionStorage)
	})

	describe('Store user in session', () => {
		it('should allow to store user in session', () => {
			sessionService.setUser({ login: 'test', token: 'token' })

			expect(fakeSessionStorage.setItem).toHaveBeenCalled()
		})
	})

	describe('Retrieve user from session', () => {
		it('should allow to retrieve user in session', () => {
			fakeSessionStorage.getItem.mockReturnValue('{ "login": "test", "token": "token" }')

			const token = sessionService.getUser()

			expect(token).toEqual({ login: 'test', token: 'token' })
		})

		it('should handle the case where there is no logged user in session', () => {
			fakeSessionStorage.getItem.mockReturnValue(null)

			const token = sessionService.getUser()

			expect(token).toBe(NO_USER)
		})
	})

	describe('Remove user from session', () => {
		it('should remove item from session', () => {
			sessionService.removeUser()

			expect(fakeSessionStorage.removeItem).toHaveBeenCalled()
		})
	})
})
