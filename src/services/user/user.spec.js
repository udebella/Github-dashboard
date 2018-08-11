import {expect} from 'chai'
import {stub} from 'sinon'
import {buildUserService} from "./user"


describe(`User service`, () => {
	let userService, fakeGraphQLClient

	beforeEach(() => {
		fakeGraphQLClient = {
			request: stub(),
			setUser: stub(),
		}
		userService = buildUserService(fakeGraphQLClient)
	})

	describe(`Initialization`, () => {
		it(`should init properly`, () => {
			expect(userService).to.exist
		})
	})

	describe(`Login`, () => {
		it(`should give token to graphql client`, () => {
			// When
			userService.login(`token`)

			// Then
			expect(fakeGraphQLClient.setUser).to.have.been.calledWith(`token`)
		})

		it(`should validate given token to github api`, async () => {
			// Given
			fakeGraphQLClient.request.returns({
				data: {
					viewer: {
						login: `user`,
					},
				},
			})

			// When
			const loggedUser = await userService.login(`token`)

			// Then
			expect(loggedUser).to.deep.equals({
				success: {
					login: `user`,
					token: `token`,
				},
			})
		})

		it(`should handle wrong token`, async () => {
			// Given
			fakeGraphQLClient.request.throws({response:{message:`Bad credentials`,status:401}})

			// When
			const loggedUser = await userService.login(`token`)

			// Then
			expect(loggedUser).to.deep.equals({
				error: {
					code: 401,
					message: `Bad credentials`,
				},
			})
		})
	})
})
