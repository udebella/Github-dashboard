import {buildSessionService, NO_USER} from './session'
import {beforeEach, describe, expect, it, vitest} from "vitest";

describe('Session service', () => {
	let sessionService, fakeSessionStorage

	beforeEach(() => {
		fakeSessionStorage = {
			setItem: vitest.fn(),
			getItem: vitest.fn(),
			removeItem: vitest.fn(),
		}

		sessionService = buildSessionService(fakeSessionStorage)
	})

	describe('Initialization', () => {
		it('should init properly', () => {
			expect(sessionService).toBeDefined()
		})
	})

	describe('Store user in session', () => {
		it('should allow to store user in session', () => {
			sessionService.setUser('token')

			expect(fakeSessionStorage.setItem).toHaveBeenCalled()
		})
	})

	describe('Retrieve user from session', () => {
		it('should allow to retrieve user in session', () => {
			fakeSessionStorage.getItem.mockReturnValue('"token"')

			const token = sessionService.getUser()

			expect(token).toBe('token')
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
