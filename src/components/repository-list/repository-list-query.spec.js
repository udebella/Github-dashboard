import {expect} from 'chai'
import {multipleRepositoryQuery, query, simpleQuery} from "./repository-list-query"

describe(`Repository list query`, () => {
	it(`should generate an empty query for an empty array of repositories`, () => {
		const graphQlQuery = query([])

		expect(graphQlQuery).to.equal(``)
	})

	it(`should generate a query for one repository`, () => {
		const graphQlQuery = query([{name: `react`, owner: `facebook`}])

		expect(graphQlQuery).to.equal(simpleQuery)
	})

	it(`should generate a query for multiple repository`, () => {
		const graphQlQuery = query([
			{name: `react`, owner: `facebook`},
			{name: `angular`, owner: `angular`},
		])

		expect(graphQlQuery).to.equal(multipleRepositoryQuery)
	})
})
