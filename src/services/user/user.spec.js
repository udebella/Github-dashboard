import {expect} from 'chai'
import {stub} from 'sinon'
import {buildUserService} from "./user"


describe(`User service`, () => {
	let userService

	beforeEach(() => {
		userService = buildUserService()
	})

	describe(`Initialization`, () => {
		it(`should init properly`, () => {
			expect(userService).to.exist
		})
	})
})
