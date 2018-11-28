import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import ViewerPullRequestList from './viewer-pull-request-list.vue'
import flushPromises from 'flush-promises'
import {stub} from 'sinon'
import {viewerFragment} from './viewer-pull-request-list'

describe('ViewerPullRequestList component', () => {
	let stubs

	beforeEach(() => {
		const store = {
			state: {watchedRepositories: [{name: 'repository', owner: 'user'}]},
		}
		const fakeGraphqlResponse = {
			viewer: {
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
			},
			rateLimit: {
				cost: 1,
				limit: 5000,
				remaining: 4999,
				resetAt: '2018-10-21T10:06:02Z',
			},
		}
		stubs = {
			store,
			queryBuilder: stub(),
			request: stub().returns(Promise.resolve(fakeGraphqlResponse)),
			fakeGraphqlResponse,
		}
	})

	describe('Initialization', () => {
		it('should have the right component name', () => {
			const viewerPullRequestList = shallowMount(ViewerPullRequestList, {store: stubs.store, propsData: stubs})

			expect(viewerPullRequestList.name()).to.equal('viewer-pull-request-list')
		})

		it('should call graphql api to retrieve data over the list of repositories', async () => {
			// Given
			stubs.queryBuilder.returns('queryBuilt')

			// When
			shallowMount(ViewerPullRequestList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
			expect(stubs.request).to.have.been.calledWith('queryBuilt')
			expect(stubs.queryBuilder).to.have.been.calledWith(viewerFragment)
		})

		it('should not display pull requests when graphql api returns an empty array of pull request for a repository', async () => {
			// Given
			stubs.fakeGraphqlResponse.viewer.pullRequests.nodes = []

			// When
			const viewerPullRequestList = shallowMount(ViewerPullRequestList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
			expect(viewerPullRequestList.contains('[data-test=line]')).to.be.false
		})

		it('should display a list of pull request', async () => {
			// When
			const viewerPullRequestList = shallowMount(ViewerPullRequestList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
			const viewerPullRequestLine = viewerPullRequestList.find('[data-test=line]')
			expect(viewerPullRequestLine.exists()).to.be.true
			expect(viewerPullRequestLine.props()).to.deep.equals({
				title: 'Fix wheel/touch browser locking in IE and Safari',
				url: 'https://github.com/facebook/react/pull/9333',
				buildStatus: 'FAILURE',
				creationDate: new Date('2018-10-20T00:00:00Z'),
				statusesList: [{
					jobStatus: 'SUCCESS',
					description: 'build description',
					jobUrl: 'http://build-target-url',
				}],
			})
		})
	})
})
