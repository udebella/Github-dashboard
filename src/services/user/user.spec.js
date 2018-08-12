import {expect} from 'chai'
import {stub} from 'sinon'
import {buildUserService} from "./user"


describe(`User service`, () => {
	let userService, mocks

	beforeEach(() => {
		mocks = {
			sessionBuilder: () => ({
				setUser: mocks.fakeSetUser,
			}),
			fakeSetUser: stub(),
			request: stub(),
		}
		userService = buildUserService(mocks)
	})

	describe(`Initialization`, () => {
		it(`should init properly`, () => {
			expect(userService).to.exist
		})
	})

	describe(`Login`, () => {
		it(`should save token to session`, () => {
			// When
			userService.login(`token`)

			// Then
			expect(mocks.fakeSetUser).to.have.been.calledWith(`token`)
		})

		it(`should validate given token to github api`, async () => {
			// Given
			mocks.request.returns({
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
			mocks.request.throws({response:{message:`Bad credentials`,status:401}})

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

	describe(`connectedUser`, () => {
		it(`should return an empty object when there is no connected user`, () => {
			const user = userService.connectedUser()

			expect(user).to.deep.equal({})
		})

		it(`should return the user after performing a login`, async () => {
			mocks.request.returns({
				data: {
					viewer: {
						login: `user`,
					},
				},
			})

			await userService.login(`token`)
			const user = userService.connectedUser()

			expect(user).to.deep.equal({
				login: `user`,
				token: `token`,
			})
		})
	})
})
