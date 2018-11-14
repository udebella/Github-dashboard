import {expect} from 'chai'
import {stub} from 'sinon'
import {shallowMount} from '@vue/test-utils'
import PullRequestList from './pull-request-list.vue'
import flushPromises from 'flush-promises'

describe(`PullRequestList component`, () => {
	let pullRequestList, stubs

	beforeEach(() => {
		// Given
		const store = {
			state: {watchedRepositories: [{name: `repository`, owner: `user`}]},
		}
		const fakeGraphqlResponse = {
			rep_0: {
				name: `react`,
				owner: {login: `facebook`},
				url: `https://github.com/facebook/react`,
				pullRequests: {
					nodes: [
						{
							title: `Fix wheel/touch browser locking in IE and Safari`,
							url: `https://github.com/facebook/react/pull/9333`,
							comments: {totalCount: 36},
							reviews: {totalCount: 39},
							updatedAt: `2018-10-25T01:36:27Z`,
							createdAt: `2018-10-20T00:00:00Z`,
							state: `OPEN`,
							commits: {
								nodes: [{
									commit: {
										status: {
											contexts: [{
												state: `SUCCESS`,
												context: `build description`,
												targetUrl: `http://build-target-url`,
											}],
											state: `FAILURE`,
										},
									},
								}],
							},
						},
					],
				},
			},
			rateLimit: {
				cost: 1,
				limit: 5000,
				remaining: 4999,
				resetAt: `2018-10-21T10:06:02Z`,
			},
		}
		stubs = {
			request: stub().returns(Promise.resolve(fakeGraphqlResponse)),
			queryBuilder: stub(),
			fakeGraphqlResponse,
			store,
		}

		pullRequestList = shallowMount(PullRequestList, {store, propsData: stubs})
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(pullRequestList.name()).to.equal(`pull-request-list`)
		})

		it(`should display a list of pull request`, async () => {
			// When
			const pullRequestList = shallowMount(PullRequestList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
			const pullRequestLine = pullRequestList.find(`[data-test=line]`)
			expect(pullRequestLine.exists()).to.be.true
			expect(pullRequestLine.props()).to.deep.equals({
				title: `Fix wheel/touch browser locking in IE and Safari`,
				url: `https://github.com/facebook/react/pull/9333`,
				buildStatus: `FAILURE`,
				creationDate: new Date(`2018-10-20T00:00:00Z`),
				statusesList: [{
					jobStatus: `SUCCESS`,
					description: `build description`,
					jobUrl: `http://build-target-url`,
				}],
			})
		})

		it(`should not display pull requests when graphql api returns an empty array of pull request for a repository`, async () => {
			// Given
			stubs.fakeGraphqlResponse.rep_0.pullRequests.nodes = []

			// When
			const pullRequestList = shallowMount(PullRequestList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
			expect(pullRequestList.contains(`[data-test=line]`)).to.be.false
		})

		it(`should display a list of pull request even when there is no build status on the pull request`, async () => {
			// Given
			stubs.fakeGraphqlResponse.rep_0.pullRequests.nodes[0].commits.nodes[0].commit.status = null

			// When
			const pullRequestList = shallowMount(PullRequestList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
			const pullRequestLine = pullRequestList.find(`[data-test=line]`)
			expect(pullRequestLine.exists()).to.be.true
			expect(pullRequestLine.props().buildStatus).to.equals(`NO_STATUS`)
		})

		it(`should work on api that are not limited`, async () => {
			// Given
			stubs.fakeGraphqlResponse.rateLimit = null

			// When
			const pullRequestList = shallowMount(PullRequestList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
			expect(pullRequestList.contains(`[data-test=line]`)).to.be.true
		})

		it(`should call graphql api to retrieve data over the list of repositories`, async () => {
			// Given
			stubs.queryBuilder.returns(`queryBuilt`)

			// When
			shallowMount(PullRequestList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
			expect(stubs.request).to.have.been.calledWith(`queryBuilt`)
		})
	})
})
