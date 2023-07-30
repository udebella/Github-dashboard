import {shallowMount} from '@vue/test-utils'
import RecentlyClosedPullRequests from './recently-closed-pull-requests.vue'
import {viewerFragment} from './recently-closed-pull-requests'
import {beforeEach, describe, expect, it, vitest} from "vitest";

describe('RecentlyClosedPullRequests component', () => {
	let stubs

	beforeEach(() => {
		const fakeGraphqlResponse = 'fake response'
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
			queryBuilder: vitest.fn().mockReturnValue('graphql query'),
			request: vitest.fn().mockResolvedValue({}),
			pullRequestReader: vitest.fn().mockReturnValue(fakeReponseRead),
			fakeGraphqlResponse,
		}
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			const recentlyClosedPullRequests = shallowMount(RecentlyClosedPullRequests, {propsData: stubs})

			expect(recentlyClosedPullRequests.exists()).toBe(true)
		})

		it('should display a title', () => {
			const recentlyClosedPullRequests = shallowMount(RecentlyClosedPullRequests, {propsData: stubs})

			expect(recentlyClosedPullRequests.find('[data-test=title]').text()).toBe('My recently merged pull requests')
		})

		it('should call graphql api to retrieve data over the list of repositories', async () => {
			// Given
			stubs.queryBuilder.mockReturnValue('queryBuilt')

			// When
			const recentlyClosedPullRequests = shallowMount(RecentlyClosedPullRequests, {propsData: stubs})

			// Then
			await triggerFakeNetworkResponse(recentlyClosedPullRequests)
			expect(recentlyClosedPullRequests.findComponent('[data-test=network-polling]').props().query).toBe('queryBuilt')
			expect(stubs.queryBuilder).toHaveBeenCalledWith(viewerFragment)
			expect(stubs.pullRequestReader).toHaveBeenCalled()
		})

		it('should not display pull requests when graphql api returns an empty array of pull request for a repository', async () => {
			// Given
			stubs.pullRequestReader.mockReturnValue([])

			// When
			const recentlyClosedPullRequests = shallowMount(RecentlyClosedPullRequests, {propsData: stubs})

			// Then
			await triggerFakeNetworkResponse(recentlyClosedPullRequests)
			expect(recentlyClosedPullRequests.find('[data-test=line]').exists()).toBe(false)
		})

		it('should display a list of pull request', async () => {
			// When
			const recentlyClosedPullRequests = shallowMount(RecentlyClosedPullRequests, {propsData: stubs})

			// Then
			await triggerFakeNetworkResponse(recentlyClosedPullRequests)
			const viewerPullRequestLine = recentlyClosedPullRequests.findComponent('[data-test=line]')
			expect(viewerPullRequestLine.exists()).toBe(true)
			expect(viewerPullRequestLine.props()).toEqual({
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

		const triggerFakeNetworkResponse = async viewerPullRequestList => {
			const networkPolling = viewerPullRequestList.findComponent('[data-test=network-polling]')
			await networkPolling.vm.$emit('http-update', stubs.fakeGraphqlResponse)
		}
	})
})
