import {buildSessionService} from "./session"
import {expect} from "chai"


describe(`Session component test`, () => {
	it(`should be save and retrieve an item in the session`, () => {
		const sessionService = buildSessionService()

		sessionService.setUser(`token`)
		const token = sessionService.getUser()

		expect(token).to.equals(`token`)
	})

	it(`should allow to save objects in session`, () => {
		const sessionService = buildSessionService()

		sessionService.setUser({
			login: `user`,
			token: `token`,
		})
		const token = sessionService.getUser()

		expect(token).to.deep.equals({
			login: `user`,
			token: `token`,
		})
	})
})
