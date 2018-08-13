import {request} from "./graphql-client"
import {expect} from 'chai'
import {spy, stub} from 'sinon'
import {NO_USER} from "../session/session"

describe(`Service: graphql-client`, () => {
	let mocks

	beforeEach(() => {
		mocks = {
			builder: spy(() => ({
				request: mocks.fakeRequest,
			})),
			fakeRequest: stub(),
			session: {
				getUser: stub().returns(NO_USER),
			},
		}
	})

	describe(`Method request`, () => {
		it(`should retrieve user from session before making a request`, () => {
			request(`someQuery`, mocks)

			expect(mocks.session.getUser).to.have.been.called
		})

		it(`should build a graphqlClient properly`, () => {
			mocks.session.getUser.returns({token: `userToken`})

			request(`someQuery`, mocks)

			expect(mocks.builder).to.have.been.calledWith(`https://api.github.com/graphql`, {
				headers: {
					Authorization: `token userToken`,
				},
			})
		})

		it(`should call request method from graphql client`, () => {
			// When
			request(`fakeQuery`, mocks)

			// Then
			expect(mocks.fakeRequest).to.have.been.calledWith(`fakeQuery`)
		})

		it(`should return a promise`, async () => {
			mocks.fakeRequest.returns(Promise.resolve(`value`))

			// When
			const response = await request(`fakeQuery`, mocks)

			// Then
			expect(response).to.equal(`value`)
		})
	})
})
