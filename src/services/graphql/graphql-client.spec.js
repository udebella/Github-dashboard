import {request} from "./graphql-client"
import {expect} from 'chai'
import {stub} from 'sinon'

describe(`Service: graphql-client`, () => {
    it(`should call request method from graphql client`, async () => {
        // Given
        const fakeRequest = stub()

        // When
        await request(`fakeQuery`, {request: fakeRequest})

        // Then
        expect(fakeRequest).to.have.been.calledWith(`fakeQuery`)
    })
})
