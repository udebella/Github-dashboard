import {expect} from 'chai'
import {stub} from 'sinon'
import {buildSessionService} from "./session"

describe(`Session service`, () => {
	let fakeSessionStorage

	beforeEach(() => {
		fakeSessionStorage = stub()
	})

	describe(`Initialization`, () => {
		it(`should work`, () => {
			const sessionService = buildSessionService(fakeSessionStorage)

			expect(sessionService).to.exist
		})
	})
})
