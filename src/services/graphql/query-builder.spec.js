import {expect} from 'chai'
import {buildRepositoriesQuery} from "./query-builder"

describe(`Query builder`, () => {
	describe(`buildRepositoriesQuery`, () => {
		describe(`Query generator`, () => {
			it(`should return a function that will use the list of repositories to generate the query`, () => {
				const emptyFragment = ``

				expect(buildRepositoriesQuery(emptyFragment)).to.be.a(`function`)
			})
		})
		describe(`Repository Query generation`, () => {
			let queryGenerator

			beforeEach(() => {
				queryGenerator = buildRepositoriesQuery(simpleRepositoryFragment)
			})

			it(`should create an empty working query when given an empty repository list`, () => {
				expect(queryGenerator([])).to.equals(emptyQuery)
			})

			it(`should create a simple query when given one repository`, () => {
				expect(queryGenerator([{owner: `facebook`, name: `react`}])).to.equals(simpleRepositoryQuery)
			})

			it(`should create a query when given multiple repositories`, () => {
				expect(queryGenerator([
					{owner: `facebook`, name: `react`},
					{owner: `angular`, name: `angular`},
				])).to.equals(multipleRepositoryQuery)
			})
		})
	})
})

const emptyQuery = `fragment rateLimit on Query {
	rateLimit {
		cost,
		limit,
		remaining,
		resetAt
	}
}

query {
	...rateLimit
}`

const simpleRepositoryQuery = `fragment rateLimit on Query {
	rateLimit {
		cost,
		limit,
		remaining,
		resetAt
	}
}

fragment repository on Repository {
	name
}

fragment repositoryList on Query {
	rep_0: repository(owner: "facebook", name: "react") {...repository}
}

query {
	...rateLimit
	...repositoryList
}`

const multipleRepositoryQuery = `fragment rateLimit on Query {
	rateLimit {
		cost,
		limit,
		remaining,
		resetAt
	}
}

fragment repository on Repository {
	name
}

fragment repositoryList on Query {
	rep_0: repository(owner: "facebook", name: "react") {...repository}
	rep_1: repository(owner: "angular", name: "angular") {...repository}
}

query {
	...rateLimit
	...repositoryList
}`

const simpleRepositoryFragment = `fragment repository on Repository {
	name
}`
