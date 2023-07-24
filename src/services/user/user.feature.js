import {buildUserService} from './user'
import {describe, expect, it} from "vitest";

describe('User component test', () => {
	it('should allow to build a user service without parameters', () => {
		// TODO test also login here
		const userService = buildUserService()

		expect(userService).to.exist
	})
})
