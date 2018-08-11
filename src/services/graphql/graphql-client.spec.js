import {request} from "./graphql-client"
import {expect} from 'chai'
import {spy} from 'sinon'

describe(`Service: graphql-client`, () => {
    it(`should call request method from graphql client`, async () => {
        // Given
        const fakeRequest = spy()

        // When
        await request(`fakeQuery`, {request: fakeRequest})

        // Then
        expect(fakeRequest).to.have.been.calledWith(`fakeQuery`)
    })
})