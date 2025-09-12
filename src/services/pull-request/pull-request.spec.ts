import { extractHttp, pullRequestFragment } from './pull-request'
import { beforeEach, describe, expect, it } from 'vitest'
import { validate } from '@octokit/graphql-schema'

describe('Pull request service', () => {
	// TODO Find a way to typecheck responses from graphql properly
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let httpResponse: any

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
							repository: { name: 'repo-name' },
							timelineItems: {
								nodes: []
							},
							commits: {
								nodes: [
									{
										commit: {
											statusCheckRollup: {
												contexts: {
													nodes: []
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

	it('should match pull request fragment', () => {
		expect(pullRequestFragment).toEqual(`fragment PullRequest on PullRequestConnection {
  nodes {
      title
      url
      comments {
        totalCount
      }
      createdAt
      updatedAt
      state
      repository {
      	name
      }
      timelineItems(last: 1, itemTypes: [PULL_REQUEST_COMMIT, PULL_REQUEST_REVIEW]) {
        nodes {
		  ...on PullRequestCommit {
			commit {
			  author {
				name
			  }
			}
		  }
		  ...on PullRequestReview {
			author {
			  login
			}
		  }
        }
      }
      commits(last: 1) {
        nodes {
          commit {
            statusCheckRollup {
            contexts(last: 10) {
            	nodes {
					...on StatusContext {
                      state
                      context
                      targetUrl
                    }
                    ...on CheckRun {
                      conclusion
                      name
                      detailsUrl
                    }
            	}
			  }
              state
            }
          }
        }
      }
    }
}`)
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
				repositoryName: 'repo-name',
				prUrl: 'https://github.com/facebook/react/pull/9333',
				creationDate: new Date('2018-10-20T00:00:00Z'),
				updateDate: new Date('2018-10-25T01:36:27Z'),
				lastEventAuthor: '',
				buildStatus: 'NO_STATUS',
				statuses: []
			}
		])
	})

	describe('LastEventAuthor read', () => {
		it('returns a default lastEventAuthor when the last action is a review', () => {
			httpResponse[0].pullRequests.nodes[0].timelineItems.nodes[0] = { author: { login: 'udebella' } }

			const response = extractHttp(httpResponse)

			expect(response[0]?.lastEventAuthor).toBe('udebella')
		})

		it('returns a default lastEventAuthor when the last action is not tracked', () => {
			httpResponse[0].pullRequests.nodes[0].timelineItems.nodes[0] = {}

			const response = extractHttp(httpResponse)

			expect(response[0]?.lastEventAuthor).toBe('')
		})

		it('is able to retrieve lastEventAuthor from commits', () => {
			httpResponse[0].pullRequests.nodes[0].timelineItems.nodes[0] = {
				commit: { author: { name: 'udebella' } }
			}

			const response = extractHttp(httpResponse)

			expect(response[0]?.lastEventAuthor).toBe('udebella')
		})
	})

	// TODO remove these duplicated tests
	describe('Statuses read', () => {
		it('extracts statuses from a response on a pull request that was built', () => {
			httpResponse[0].pullRequests.nodes[0].commits.nodes[0].commit.statusCheckRollup.contexts.nodes[0] = {
				state: 'SUCCESS',
				context: 'build description',
				targetUrl: 'http://build-target-url'
			}

			const response = extractHttp(httpResponse)

			expect(response).toEqual([
				{
					prTitle: 'Fix wheel/touch browser locking in IE and Safari',
					prUrl: 'https://github.com/facebook/react/pull/9333',
					creationDate: new Date('2018-10-20T00:00:00Z'),
					updateDate: new Date('2018-10-25T01:36:27Z'),
					lastEventAuthor: '',
					repositoryName: 'repo-name',
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
					lastEventAuthor: '',
					repositoryName: 'repo-name',
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

		it('has a pending status while job is not finished', () => {
			httpResponse[0].pullRequests.nodes[0].commits.nodes[0].commit.statusCheckRollup.contexts.nodes[0] = {
				conclusion: null,
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
					lastEventAuthor: '',
					repositoryName: 'repo-name',
					buildStatus: 'SUCCESS',
					statuses: [
						{
							jobStatus: 'PENDING',
							description: 'build description',
							jobUrl: 'http://build-target-url'
						}
					]
				}
			])
		})
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
						repository: { name: 'repo-name' },
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

		expect(response[0]?.prTitle).toBe('Implement pauseExecution, continueExecution, dumpQueue for Scheduler')
		expect(response[1]?.prTitle).toBe('Fix wheel/touch browser locking in IE and Safari')
	})
})
