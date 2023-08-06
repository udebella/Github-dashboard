import { extractHttp, pullRequestFragment } from './pull-request'
import { beforeEach, describe, expect, it } from 'vitest'
import { validate } from '@octokit/graphql-schema'

describe('Pull request service', () => {
	let httpResponse

	beforeEach(() => {
		httpResponse = [
			{
				pullRequests: {
					nodes: [
						{
							title: 'Fix wheel/touch browser locking in IE and Safari',
							url: 'https://github.com/facebook/react/pull/9333',
							updatedAt: '2018-10-25T01:36:27Z',
							createdAt: '2018-10-20T00:00:00Z',
							state: 'OPEN',
							timelineItems: {
								nodes: [
									{
										author: {
											login: 'udebella'
										}
									}
								]
							},
							commits: {
								nodes: [
									{
										commit: {
											statusCheckRollup: {
												contexts: {
													nodes: [
														{
															state: 'SUCCESS',
															context: 'build description',
															targetUrl: 'http://build-target-url'
														}
													]
												},
												state: 'SUCCESS'
											}
										}
									}
								]
							}
						}
					]
				}
			}
		]
	})

	it('creates valid requests', () => {
		const query = `${pullRequestFragment} query { repository(name: "example", owner: "owner") { pullRequests(last: 1) { ...PullRequest } } }`

		const errors = validate(query)

		expect(errors).toEqual([])
	})

	it('returns an empty array when there is no pull request in http response', () => {
		httpResponse[0].pullRequests.nodes = []
		const response = extractHttp(httpResponse)

		expect(response).toEqual([])
	})

	it('returns a formatted response when pull request was not build', () => {
		httpResponse[0].pullRequests.nodes[0].commits.nodes[0].commit.statusCheckRollup = null

		const response = extractHttp(httpResponse)

		expect(response).toEqual([
			{
				prTitle: 'Fix wheel/touch browser locking in IE and Safari',
				prUrl: 'https://github.com/facebook/react/pull/9333',
				creationDate: new Date('2018-10-20T00:00:00Z'),
				updateDate: new Date('2018-10-25T01:36:27Z'),
				lastEventAuthor: 'udebella',
				buildStatus: 'NO_STATUS',
				statuses: []
			}
		])
	})

	it('returns a default lastEventAuthor when the last action is a commit', () => {
		httpResponse[0].pullRequests.nodes[0].timelineItems.nodes[0].author = { login: 'udebella' }

		const response = extractHttp(httpResponse)

		expect(response[0].lastEventAuthor).toBe('udebella')
	})

	it('returns a default lastEventAuthor when the last action is not tracked', () => {
		httpResponse[0].pullRequests.nodes[0].timelineItems.nodes[0] = {}

		const response = extractHttp(httpResponse)

		expect(response[0].lastEventAuthor).toBe('')
	})

	it('is able to retrieve lastEventAuthor from commits', () => {
		httpResponse[0].pullRequests.nodes[0].timelineItems.nodes[0] = {
			commit: { author: { user: { login: 'udebella' } } }
		}

		const response = extractHttp(httpResponse)

		expect(response[0].lastEventAuthor).toBe('udebella')
	})

	it('extracts statuses from a response on a pull request that was built', () => {
		const response = extractHttp(httpResponse)

		expect(response).toEqual([
			{
				prTitle: 'Fix wheel/touch browser locking in IE and Safari',
				prUrl: 'https://github.com/facebook/react/pull/9333',
				creationDate: new Date('2018-10-20T00:00:00Z'),
				updateDate: new Date('2018-10-25T01:36:27Z'),
				lastEventAuthor: 'udebella',
				buildStatus: 'SUCCESS',
				statuses: [
					{
						jobStatus: 'SUCCESS',
						description: 'build description',
						jobUrl: 'http://build-target-url'
					}
				]
			}
		])
	})

	it('extracts statuses from a response on a pull request that was built with github actions', () => {
		httpResponse[0].pullRequests.nodes[0].commits.nodes[0].commit.statusCheckRollup.contexts.nodes[0] = {
			conclusion: 'SUCCESS',
			name: 'build description',
			detailsUrl: 'http://build-target-url'
		}

		const response = extractHttp(httpResponse)

		expect(response).toEqual([
			{
				prTitle: 'Fix wheel/touch browser locking in IE and Safari',
				prUrl: 'https://github.com/facebook/react/pull/9333',
				creationDate: new Date('2018-10-20T00:00:00Z'),
				updateDate: new Date('2018-10-25T01:36:27Z'),
				lastEventAuthor: 'udebella',
				buildStatus: 'SUCCESS',
				statuses: [
					{
						jobStatus: 'SUCCESS',
						description: 'build description',
						jobUrl: 'http://build-target-url'
					}
				]
			}
		])
	})

	it('orders pull requests by last update date', () => {
		httpResponse.push({
			pullRequests: {
				nodes: [
					{
						title: 'Implement pauseExecution, continueExecution, dumpQueue for Scheduler',
						url: 'https://github.com/facebook/react/pull/14053',
						createdAt: '2018-10-31T22:17:12Z',
						updatedAt: '2018-11-07T20:10:15Z',
						state: 'OPEN',
						timelineItems: {
							nodes: [{}]
						},
						commits: {
							nodes: []
						}
					}
				]
			}
		})

		const response = extractHttp(httpResponse)

		expect(response[0].prTitle).toBe('Implement pauseExecution, continueExecution, dumpQueue for Scheduler')
		expect(response[1].prTitle).toBe('Fix wheel/touch browser locking in IE and Safari')
	})
})
