import {expect} from 'chai'
import {stub} from 'sinon'
import {buildUserService} from "./user"


describe(`User service`, () => {
	let userService, mocks

	beforeEach(() => {
		mocks = {
			sessionBuilder: () => ({
				setUser: mocks.fakeSetUser,
				getUser: mocks.fakeGetUser,
				removeUser: mocks.fakeRemoveUser,
			}),
			fakeSetUser: stub(),
			fakeGetUser: stub(),
			fakeRemoveUser: stub(),
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
		it(`should save token to session for validation`, () => {
			// Given
			mocks.request.returns({
				viewer: {login: `user`},
			})

			// When
			userService.login(`token`)

			// Then
			expect(mocks.fakeSetUser).to.have.been.calledWith({token: `token`})
		})

		it(`should validate given token to github api`, async () => {
			// Given
			mocks.request.returns({
				viewer: {login: `user`},
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

		it(`should save user data in session when validated through github api`, async () => {
			// Given
			mocks.request.returns({
				viewer: {login: `user`},
			})

			// When
			await userService.login(`token`)

			// Then
			expect(mocks.fakeRemoveUser).to.have.callCount(0)
			expect(mocks.fakeSetUser).to.have.been.calledWith({
				login: `user`,
				token: `token`,
			})
		})

		it(`should handle wrong token`, async () => {
			// Given
			mocks.request.throws({response: {message: `Bad credentials`, status: 401}})

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

		it(`should reset session when token is invalid`, async () => {
			// Given
			mocks.request.throws({response: {message: `Bad credentials`, status: 401}})

			// When
			await userService.login(`token`)

			// Then
			expect(mocks.fakeRemoveUser).to.have.been.called
		})
	})

	describe(`connectedUser`, () => {
		it(`should return an empty object when there is no connected user`, () => {
			mocks.fakeGetUser.returns({})

			const user = userService.connectedUser()

			expect(user).to.deep.equal({})
		})

		it(`should return the user after performing a login`, () => {
			mocks.fakeGetUser.returns({
				login: `user`,
				token: `token`,
			})

			const user = userService.connectedUser()

			expect(user).to.deep.equal({
				login: `user`,
				token: `token`,
			})
		})
	})
})
