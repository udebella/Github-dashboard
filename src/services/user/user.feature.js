import {expect} from 'chai'
import {buildUserService} from "./user"

describe(`User component test`, () => {
	it(`should allow to build a user service without parameters`, () => {
		// TODO test also login here
		const userService = buildUserService()

		expect(userService).to.exist
	})
})
