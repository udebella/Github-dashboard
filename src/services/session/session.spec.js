import {expect} from 'chai'
import {stub} from 'sinon'
import {buildSessionService} from "./session"

describe(`Session service`, () => {
	let sessionService, fakeSessionStorage

	beforeEach(() => {
		fakeSessionStorage = {
			setItem: stub(),
		}

		sessionService = buildSessionService(fakeSessionStorage)
	})

	describe(`Initialization`, () => {
		it(`should work`, () => {
			expect(sessionService).to.exist
		})
	})

	describe(`Store data in session`, () => {
		it(`should allow to store user in session`, () => {
			sessionService.setUser(`aaa`)

			expect(fakeSessionStorage.setItem).to.have.been.calledWith(`userToken`, `aaa`)
		})
	})
})
