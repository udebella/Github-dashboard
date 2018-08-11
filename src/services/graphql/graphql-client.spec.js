import {getClient} from "./graphql-client"
import {expect} from 'chai'
import {spy, stub} from 'sinon'

describe(`Service: graphql-client`, () => {
	let graphQlClient, graphQlClientBuilder, fakeRequest, fakeSession

	beforeEach(() => {
		fakeSession = {
			getUser: stub(),
		}
		fakeRequest = stub()
		graphQlClientBuilder = spy(() => ({
			request: fakeRequest,
		}))
		graphQlClient = getClient(graphQlClientBuilder, fakeSession)
	})

	describe(`Initialization`, () => {
		it(`should retrieve user from session before making a request`, () => {
			expect(fakeSession.getUser).to.have.been.called
		})

		it(`should build a graphqlClient properly`, () => {
			fakeSession.getUser.returns(`userToken`)

			graphQlClient = getClient(graphQlClientBuilder, fakeSession)

			expect(graphQlClientBuilder).to.have.been.calledWith(`/graphql`, {
				headers: {
					Authorization: `token userToken`,
				},
			})
		})
	})

	describe(`Method request`, () => {
		it(`should call request method from graphql client`, () => {
			// When
			graphQlClient.request(`fakeQuery`)

			// Then
			expect(fakeRequest).to.have.been.calledWith(`fakeQuery`)
		})
	})
})
