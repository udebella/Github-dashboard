import {request} from "./graphql-client"
import {expect} from 'chai'
import {spy, stub} from 'sinon'

describe(`Service: graphql-client`, () => {
	let mocks

	beforeEach(() => {
		mocks = {
			builder: spy(() => ({
				request: mocks.fakeRequest,
			})),
			fakeRequest: stub(),
			session: {
				getUser: stub(),
			},
		}
	})

	describe(`Initialization`, () => {
		it(`should retrieve user from session before making a request`, () => {
			request(`someQuery`, mocks)

			expect(mocks.session.getUser).to.have.been.called
		})

		it(`should build a graphqlClient properly`, () => {
			mocks.session.getUser.returns(`userToken`)

			request(`someQuery`, mocks)

			expect(mocks.builder).to.have.been.calledWith(`/graphql`, {
				headers: {
					Authorization: `token userToken`,
				},
			})
		})
	})

	describe(`Method request`, () => {
		it(`should call request method from graphql client`, () => {
			// When
			request(`fakeQuery`, mocks)

			// Then
			expect(mocks.fakeRequest).to.have.been.calledWith(`fakeQuery`)
		})
	})
})
