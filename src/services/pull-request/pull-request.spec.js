import {expect} from 'chai'
import {extractHttp} from './pull-request'

describe(`Pull request service`, () => {
	it(`should return an empty array when there is no pull request in http response`, () => {
		const response = extractHttp({pullRequests: {nodes: []}})

		expect(response).to.deep.equals([])
	})
})
