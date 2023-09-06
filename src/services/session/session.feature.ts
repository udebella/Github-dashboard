import { buildSessionService } from './session'
import { describe, expect, it } from 'vitest'

describe('Session component test', () => {
	it('should be save and retrieve an item in the session', () => {
		const sessionService = buildSessionService()

		sessionService.setUser({ login: 'user', token: 'token' })
		const token = sessionService.getUser()

		expect(token).toEqual({ login: 'user', token: 'token' })
	})
})
