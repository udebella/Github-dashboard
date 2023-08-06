import { beforeEach, describe, expect, it } from 'vitest'
import { extractStatuses } from '../pull-request/pull-request'

describe('Statuses read', () => {
	// TODO find a way to properly type graphql responses
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let graphqlResponse: any

	beforeEach(() => {
		graphqlResponse = {
			contexts: {
				nodes: []
			},
			state: 'SUCCESS'
		}
	})

	it('extracts statuses from a response on a pull request that was built', () => {
		graphqlResponse.contexts.nodes.push({
			state: 'SUCCESS',
			context: 'build description',
			targetUrl: 'http://build-target-url'
		})

		const response = extractStatuses(graphqlResponse)

		expect(response).toEqual({
			buildStatus: 'SUCCESS',
			statuses: [
				{
					jobStatus: 'SUCCESS',
					description: 'build description',
					jobUrl: 'http://build-target-url'
				}
			]
		})
	})

	it('extracts statuses from a response on a pull request that was built with github actions', () => {
		graphqlResponse.contexts.nodes.push({
			conclusion: 'SUCCESS',
			name: 'build description',
			detailsUrl: 'http://build-target-url'
		})

		const response = extractStatuses(graphqlResponse)

		expect(response).toEqual({
			buildStatus: 'SUCCESS',
			statuses: [
				{
					jobStatus: 'SUCCESS',
					description: 'build description',
					jobUrl: 'http://build-target-url'
				}
			]
		})
	})

	it('has a pending status while job is not finished', () => {
		graphqlResponse.contexts.nodes.push({
			conclusion: null,
			name: 'build description',
			detailsUrl: 'http://build-target-url'
		})

		const response = extractStatuses(graphqlResponse)

		expect(response).toEqual({
			buildStatus: 'SUCCESS',
			statuses: [
				{
					jobStatus: 'PENDING',
					description: 'build description',
					jobUrl: 'http://build-target-url'
				}
			]
		})
	})
})
