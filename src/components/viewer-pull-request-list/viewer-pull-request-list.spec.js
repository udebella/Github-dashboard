import {shallowMount} from '@vue/test-utils'
import ViewerPullRequestList from './viewer-pull-request-list.vue'
import {viewerFragment} from './viewer-pull-request-list'
import {beforeEach, describe, expect, it, vitest} from "vitest";

describe('ViewerPullRequestList component', () => {
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
			request: vitest.fn().mockReturnValue(Promise.resolve({})),
			pullRequestReader: vitest.fn().mockReturnValue(fakeReponseRead),
			userService: {connectedUser: vitest.fn().mockReturnValue({login: 'udebella'})},
			fakeReponseRead,
			fakeGraphqlResponse,
		}
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			const viewerPullRequestList = shallowMount(ViewerPullRequestList, {propsData: stubs})

			expect(viewerPullRequestList.exists()).toBe(true)
		})

		it('should display a title', () => {
			const viewerPullRequestList = shallowMount(ViewerPullRequestList, {propsData: stubs})

			expect(viewerPullRequestList.find('[data-test=title]').text()).toBe('My currently open pull requests')
		})

		it('should call graphql api to retrieve data over the list of repositories', async () => {
			// Given
			stubs.queryBuilder.mockReturnValue('queryBuilt')

			// When
			const viewerPullRequestList = shallowMount(ViewerPullRequestList, {propsData: stubs})

			// Then
			await triggerFakeNetworkResponse(viewerPullRequestList)
			expect(viewerPullRequestList.findComponent('[data-test=network-polling]').props().query).toBe('queryBuilt')
			expect(stubs.queryBuilder).toHaveBeenCalledWith(viewerFragment)
			expect(stubs.pullRequestReader).toHaveBeenCalled()
		})

		it('should not display pull requests when graphql api returns an empty array of pull request for a repository', async () => {
			// Given
			stubs.fakeReponseRead = []
			stubs.pullRequestReader.mockReturnValue(stubs.fakeReponseRead)

			// When
			const viewerPullRequestList = shallowMount(ViewerPullRequestList, {propsData: stubs})

			// Then
			await triggerFakeNetworkResponse(viewerPullRequestList)
			expect(viewerPullRequestList.find('[data-test=line]').exists()).toBe(false)
		})

		it('should display a list of pull request', async () => {
			// When
			const viewerPullRequestList = shallowMount(ViewerPullRequestList, {propsData: stubs})

			// Then
			await triggerFakeNetworkResponse(viewerPullRequestList)
			const viewerPullRequestLine = viewerPullRequestList.findComponent('[data-test=line]')
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

		it('should display an update icon if an other user is the author of the last event', async () => {
			stubs.fakeReponseRead[0].lastEventAuthor = 'anOtherUser'

			// When
			const viewerPullRequestList = shallowMount(ViewerPullRequestList, {propsData: stubs})

			// Then
			await triggerFakeNetworkResponse(viewerPullRequestList)
			const viewerPullRequestLine = viewerPullRequestList.findComponent('[data-test=line]')
			expect(viewerPullRequestLine.props().hasUpdates).toBe(true)
		})

		const triggerFakeNetworkResponse = async viewerPullRequestList => {
			const networkPolling = viewerPullRequestList.findComponent('[data-test=network-polling]')
			await networkPolling.vm.$emit('http-update', stubs.fakeGraphqlResponse)
		}
	})
})
