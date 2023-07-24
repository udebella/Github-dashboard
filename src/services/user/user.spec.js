import {expect} from 'chai'
import {buildUserService} from './user'
import { describe, it, beforeEach, vitest } from "vitest";


describe('User service', () => {
	let userService, mocks

	beforeEach(() => {
		mocks = {
			sessionBuilder: () => ({
				setUser: mocks.fakeSetUser,
				getUser: mocks.fakeGetUser,
				removeUser: mocks.fakeRemoveUser,
			}),
			fakeSetUser: vitest.fn(),
			fakeGetUser: vitest.fn(),
			fakeRemoveUser: vitest.fn(),
			request: vitest.fn(),
		}
		userService = buildUserService(mocks)
	})

	describe('Initialization', () => {
		it('should init properly', () => {
			expect(userService).to.exist
		})
	})

	describe('Login', () => {
		it('should save token to session for validation', () => {
			mocks.request.mockReturnValue({
				viewer: {login: 'user'},
			})

			userService.login('token')

			expect(mocks.fakeSetUser).toHaveBeenCalledWith({token: 'token'})
		})

		it('should validate given token to github api', async () => {
			mocks.request.mockReturnValue({
				viewer: {login: 'user'},
			})

			const loggedUser = await userService.login('token')

			expect(loggedUser).toEqual({
				success: {
					login: 'user',
					token: 'token',
				},
			})
		})

		it('should save user data in session when validated through github api', async () => {
			mocks.request.mockReturnValue({
				viewer: {login: 'user'},
			})

			await userService.login('token')

			expect(mocks.fakeRemoveUser).not.toHaveBeenCalled()
			expect(mocks.fakeSetUser).toHaveBeenCalledWith({
				login: 'user',
				token: 'token',
			})
		})

		it('should handle wrong token', async () => {
			mocks.request.mockImplementation(() => { throw {response: {message: 'Bad credentials', status: 401}}})

			const loggedUser = await userService.login('token')

			expect(loggedUser).to.deep.equals({
				error: {
					code: 401,
					message: 'Bad credentials',
				},
			})
		})

		it('should reset session when token is invalid', async () => {
			mocks.request.mockImplementation(() => { throw {response: {message: 'Bad credentials', status: 401}}})

			await userService.login('token')

			expect(mocks.fakeRemoveUser).toHaveBeenCalled()
		})
	})

	describe('connectedUser', () => {
		it('should return an empty object when there is no connected user', () => {
			mocks.fakeGetUser.mockReturnValue({})

			const user = userService.connectedUser()

			expect(user).toEqual({})
		})

		it('should return the user after performing a login', () => {
			mocks.fakeGetUser.mockReturnValue({
				login: 'user',
				token: 'token',
			})

			const user = userService.connectedUser()

			expect(user).toEqual({
				login: 'user',
				token: 'token',
			})
		})
	})
})
