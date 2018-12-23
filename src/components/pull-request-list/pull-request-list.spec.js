import {expect} from 'chai'
import {stub} from 'sinon'
import {shallowMount} from '@vue/test-utils'
import PullRequestList from './pull-request-list.vue'
import flushPromises from 'flush-promises'

describe('PullRequestList component', () => {
	let pullRequestList, stubs

	beforeEach(() => {
		const store = {
			state: {watchedRepositories: [{name: 'repository', owner: 'user'}]},
		}
		const fakeReactResponse = {
			name: 'react',
			owner: {login: 'facebook'},
			url: 'https://github.com/facebook/react',
			pullRequests: {
				nodes: [
					{
						title: 'Fix wheel/touch browser locking in IE and Safari',
						url: 'https://github.com/facebook/react/pull/9333',
						comments: {totalCount: 36},
						reviews: {totalCount: 39},
						updatedAt: '2018-10-25T01:36:27Z',
						createdAt: '2018-10-20T00:00:00Z',
						state: 'OPEN',
						commits: {
							nodes: [{
								commit: {
									status: {
										contexts: [{
											state: 'SUCCESS',
											context: 'build description',
											targetUrl: 'http://build-target-url',
										}],
										state: 'FAILURE',
									},
								},
							}],
						},
					},
				],
			},
		}
		const fakeAngularResponse = {
			name: 'angular',
			owner: {
				login: 'angular',
			},
			url: 'https://github.com/angular/angular',
			pullRequests: {
				nodes: [
					{
						title: 'WIP - feat(ivy): implement listing lazy routes in `ngtsc`',
						url: 'https://github.com/angular/angular/pull/27697',
						comments: { totalCount: 5},
						createdAt: '2018-12-16T18:26:59Z',
						updatedAt: '2018-12-16T21:05:45Z',
						reviews: {
							totalCount: 0,
						},
						state: 'OPEN',
						commits: {
							nodes: [
								{
									commit: {
										status: {
											contexts: [
												{
													state: 'SUCCESS',
													context: 'continuous-integration/travis-ci/pr',
													targetUrl: 'https://travis-ci.org/angular/angular/builds/468759214?utm_source=github_status&utm_medium=notification',
												},
											],
											state: 'FAILURE',
										},
									},
								},
							],
						},
					},
				],
			},
		}
		const fakeGraphqlResponse = {
			rep_0: fakeReactResponse,
			rep_1: fakeAngularResponse,
			rateLimit: {
				cost: 1,
				limit: 5000,
				remaining: 4999,
				resetAt: '2018-10-21T10:06:02Z',
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

	describe('Initialization', () => {
		it('should have the right component name', () => {
			expect(pullRequestList.name()).to.equal('pull-request-list')
		})

		it('should display a list of pull request', async () => {
			// When
			const pullRequestList = shallowMount(PullRequestList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
			const pullRequestLine = pullRequestList.findAll('[data-test=line]')
			expect(pullRequestLine.length).to.equal(2)
			expect(pullRequestLine.at(0).props()).to.deep.equals({
				title: 'WIP - feat(ivy): implement listing lazy routes in `ngtsc`',
				url: 'https://github.com/angular/angular/pull/27697',
				buildStatus: 'FAILURE',
				creationDate: new Date('2018-12-16T18:26:59Z'),
				hasUpdates: false,
				statusesList: [{
					jobStatus: 'SUCCESS',
					description: 'continuous-integration/travis-ci/pr',
					jobUrl: 'https://travis-ci.org/angular/angular/builds/468759214?utm_source=github_status&utm_medium=notification',
				}],
			})
			expect(pullRequestLine.at(1).props()).to.deep.equals({
				title: 'Fix wheel/touch browser locking in IE and Safari',
				url: 'https://github.com/facebook/react/pull/9333',
				buildStatus: 'FAILURE',
				creationDate: new Date('2018-10-20T00:00:00Z'),
				hasUpdates: false,
				statusesList: [{
					jobStatus: 'SUCCESS',
					description: 'build description',
					jobUrl: 'http://build-target-url',
				}],
			})
		})

		it('should not display pull requests when graphql api returns an empty array of pull request for a repository', async () => {
			// Given
			stubs.fakeGraphqlResponse.rep_0.pullRequests.nodes = []
			stubs.fakeGraphqlResponse.rep_1.pullRequests.nodes = []

			// When
			const pullRequestList = shallowMount(PullRequestList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
			expect(pullRequestList.contains('[data-test=line]')).to.be.false
		})

		it('should display a list of pull request even when there is no build status on the pull request', async () => {
			// Given
			stubs.fakeGraphqlResponse.rep_1.pullRequests.nodes[0].commits.nodes[0].commit.status = null

			// When
			const pullRequestList = shallowMount(PullRequestList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
			const pullRequestLine = pullRequestList.find('[data-test=line]')
			expect(pullRequestLine.exists()).to.be.true
			expect(pullRequestLine.props().buildStatus).to.equals('NO_STATUS')
		})

		it('should work on api that are not limited', async () => {
			// Given
			stubs.fakeGraphqlResponse.rateLimit = null

			// When
			const pullRequestList = shallowMount(PullRequestList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
			expect(pullRequestList.contains('[data-test=line]')).to.be.true
		})

		it('should call graphql api to retrieve data over the list of repositories', async () => {
			// Given
			stubs.queryBuilder.returns('queryBuilt')

			// When
			shallowMount(PullRequestList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
			expect(stubs.request).to.have.been.calledWith('queryBuilt')
		})

		it('should display pull request ordered by last update date across repositories', async () => {
			// When
			const pullRequestList = shallowMount(PullRequestList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
			const pullRequestLine = pullRequestList.findAll({name: 'pull-request-line'})
			expect(pullRequestLine.length).to.equal(2)
			expect(pullRequestLine.at(0).props().title).to.deep.equals('WIP - feat(ivy): implement listing lazy routes in `ngtsc`')
			expect(pullRequestLine.at(1).props().title).to.deep.equals('Fix wheel/touch browser locking in IE and Safari')
		})
	})
})
