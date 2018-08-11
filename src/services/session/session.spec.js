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
			sessionService.setUser(`token`)

			expect(fakeSessionStorage.setItem).to.have.been.called
		})
	})

	describe(`Retrieve user from session`, () => {
		it(`should allow to retrieve user in session`, () => {
			fakeSessionStorage.getItem.returns(`token`)

			const token = sessionService.getUser()

			expect(token).to.equal(`token`)
		})

		it(`should handle the case where there is no logged user in session`, () => {
			fakeSessionStorage.getItem.returns(null)

			const token = sessionService.getUser()

			expect(token).to.equal(NO_TOKEN)
		})
	})
})
