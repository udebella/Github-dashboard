import { buildRepositoriesQuery, buildViewerQuery } from './query-builder.ts'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Query builder', () => {
	describe('buildRepositoriesQuery', () => {
		describe('Query generator', () => {
			it('should return a function that will use the list of repositories to generate the query', () => {
				const emptyFragment = ''

				expect(buildRepositoriesQuery(emptyFragment)).toBeTypeOf('function')
			})
		})

		describe('Repository Query generation', () => {
			let queryGenerator

			beforeEach(() => {
				queryGenerator = buildRepositoriesQuery(simpleRepositoryFragment)
			})

			it('should create an empty working query when given an empty repository list', () => {
				expect(queryGenerator([])).toBe(emptyQuery)
			})

			it('should create a simple query when given one repository', () => {
				expect(queryGenerator([{ owner: 'facebook', name: 'react' }])).toBe(simpleRepositoryQuery)
			})

			it('should create a query when given multiple repositories', () => {
				expect(
					queryGenerator([
						{ owner: 'facebook', name: 'react' },
						{ owner: 'angular', name: 'angular' }
					])
				).toBe(multipleRepositoryQuery)
			})
		})

		describe('Viewer Query generation', () => {
			it('should create an empty working query when an empty fragment', () => {
				const emptyFragment = ''

				expect(buildViewerQuery(emptyFragment)).toBe(emptyQuery)
			})
			it('should create the query when using the given fragment', () => {
				expect(buildViewerQuery(simpleViewerFragment)).toBe(simpleViewerQuery)
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

const simpleViewerQuery = `fragment rateLimit on Query {
	rateLimit {
		cost,
		limit,
		remaining,
		resetAt
	}
}

fragment viewer on User {
	login
}

query {
	...rateLimit
	viewer {...viewer}
}`

const simpleViewerFragment = `fragment viewer on User {
	login
}`
