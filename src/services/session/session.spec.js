import {expect} from 'chai'
import {stub} from 'sinon'
import {NO_TOKEN, buildSessionService} from "./session"

describe(`Session service`, () => {
	let sessionService, fakeSessionStorage

	beforeEach(() => {
		fakeSessionStorage = {
			setItem: stub(),
			getItem: stub(),
		}

		sessionService = buildSessionService(fakeSessionStorage)
	})

	describe(`Initialization`, () => {
		it(`should work`, () => {
			expect(sessionService).to.exist
		})
	})

	describe(`Store user in session`, () => {
		it(`should allow to store user in session`, () => {
			sessionService.setUser(`aaa`)

			expect(fakeSessionStorage.setItem).to.have.been.calledWith(`userToken`, `aaa`)
		})
	})

	describe(`Retrieve user from session`, () => {
		it(`should allow to retrieve user in session`, () => {
			fakeSessionStorage.getItem.returns(`aaa`)

			const token = sessionService.getUser()

			expect(token).to.equal(`aaa`)
		})

		it(`should handle the case where there is no logged user in session`, () => {
			fakeSessionStorage.getItem.returns(null)

			const token = sessionService.getUser()

			expect(token).to.equal(NO_TOKEN)
		})
	})
})
