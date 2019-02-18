import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import RecentlyClosedPullRequests from './recently-closed-pull-requests.vue'
import flushPromises from 'flush-promises'
import {stub} from 'sinon'
import {viewerFragment} from './recently-closed-pull-requests'

describe('RecentlyClosedPullRequests component', () => {
	let stubs

	beforeEach(() => {
		const fakeReponseRead = [{
			prTitle: 'Fix wheel/touch browser locking in IE and Safari',
			prUrl: 'https://github.com/facebook/react/pull/9333',
			creationDate: new Date('2018-10-20T00:00:00Z'),
			updateDate: new Date('2018-10-25T01:36:27Z'),
			lastEventAuthor: 'udebella',
			buildStatus: 'FAILURE',
			statuses: [{
				jobStatus: 'SUCCESS',
				description: 'build description',
				jobUrl: 'http://build-target-url',
			}],
		}]
		stubs = {
			queryBuilder: stub(),
			request: stub().returns(Promise.resolve({})),
			pullRequestReader: stub().returns(fakeReponseRead),
			fakeReponseRead,
		}
	})

	describe('Initialization', () => {
		it('should have the right component name', () => {
			const recentlyClosedPullRequests = shallowMount(RecentlyClosedPullRequests, {propsData: stubs})

			expect(recentlyClosedPullRequests.name()).to.equal('recently-closed-pull-requests')
		})

		it('should display a title', () => {
			const recentlyClosedPullRequests = shallowMount(RecentlyClosedPullRequests, {propsData: stubs})

			expect(recentlyClosedPullRequests.find('[data-test=title]').text()).to.equal('My recently closed pull requests')
		})

		it('should call graphql api to retrieve data over the list of repositories', async () => {
			// Given
			stubs.queryBuilder.returns('queryBuilt')

			// When
			shallowMount(RecentlyClosedPullRequests, {propsData: stubs})

			// Then
			await flushPromises()
			expect(stubs.request).to.have.been.calledWith('queryBuilt')
			expect(stubs.queryBuilder).to.have.been.calledWith(viewerFragment)
			expect(stubs.pullRequestReader).to.have.been.called
		})

		it('should not display pull requests when graphql api returns an empty array of pull request for a repository', async () => {
			// Given
			stubs.fakeReponseRead = []
			stubs.pullRequestReader.returns(stubs.fakeReponseRead)

			// When
			const recentlyClosedPullRequests = shallowMount(RecentlyClosedPullRequests, {propsData: stubs})

			// Then
			await flushPromises()
			expect(recentlyClosedPullRequests.contains('[data-test=line]')).to.be.false
		})

		it('should display a list of pull request', async () => {
			// When
			const recentlyClosedPullRequests = shallowMount(RecentlyClosedPullRequests, {propsData: stubs})

			// Then
			await flushPromises()
			const viewerPullRequestLine = recentlyClosedPullRequests.find('[data-test=line]')
			expect(viewerPullRequestLine.exists()).to.be.true
			expect(viewerPullRequestLine.props()).to.deep.equals({
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
	})
})