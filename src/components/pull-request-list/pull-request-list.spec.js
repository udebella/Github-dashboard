import { flushPromises, shallowMount } from '@vue/test-utils'
import PullRequestList from './pull-request-list.vue'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vitest } from 'vitest'
import NetworkPolling from '../network-polling/network-polling.js'

describe('PullRequestList component', () => {
	let pullRequestList, stubs

	beforeEach(() => {
		setActivePinia(createPinia())
		const fakeReactResponse = {
			name: 'react',
			owner: { login: 'facebook' },
			url: 'https://github.com/facebook/react',
			pullRequests: {}
		}
		const fakeAngularResponse = {
			name: 'angular',
			owner: {
				login: 'angular'
			},
			url: 'https://github.com/angular/angular',
			pullRequests: {}
		}
		const fakeGraphqlResponse = {
			rep_0: fakeReactResponse,
			rep_1: fakeAngularResponse,
			rateLimit: {
				cost: 1,
				limit: 5000,
				remaining: 4999,
				resetAt: '2018-10-21T10:06:02Z'
			}
		}

		const fakeResponseRead = [
			{
				prTitle: 'WIP - feat(ivy): implement listing lazy routes in `ngtsc`',
				prUrl: 'https://github.com/angular/angular/pull/27697',
				creationDate: new Date('2018-12-16T18:26:59.000Z'),
				updateDate: new Date('2018-12-16T21:05:45Z'),
				lastEventAuthor: 'anUser',
				buildStatus: 'FAILURE',
				repositoryName: 'repo-name',
				statuses: [
					{
						jobStatus: 'SUCCESS',
						description: 'continuous-integration/travis-ci/pr',
						jobUrl: 'https://travis-ci.org/angular/angular/builds/468759214?utm_source=github_status&utm_medium=notification'
					}
				]
			},
			{
				prTitle: 'Fix wheel/touch browser locking in IE and Safari',
				prUrl: 'https://github.com/facebook/react/pull/9333',
				creationDate: new Date('2018-10-20T00:00:00Z'),
				updateDate: new Date('2018-10-25T01:36:27Z'),
				lastEventAuthor: 'udebella',
				buildStatus: 'FAILURE',
				repositoryName: 'repo-name',
				statuses: [
					{
						jobStatus: 'SUCCESS',
						description: 'build description',
						jobUrl: 'http://build-target-url'
					}
				]
			}
		]
		stubs = {
			request: vitest.fn().mockReturnValue(Promise.resolve(fakeGraphqlResponse)),
			queryBuilder: vitest.fn().mockReturnValue('graphql query'),
			pullRequestReader: vitest.fn().mockReturnValue(fakeResponseRead),
			pullRequestNotifications: { newList: vitest.fn() },
			userService: { connectedUser: vitest.fn().mockReturnValue({ login: 'udebella' }) },
			fakeGraphqlResponse,
			fakeResponseRead
		}

		pullRequestList = shallowMount(PullRequestList, {
			global: {
				renderStubDefaultSlot: true,
				provide: stubs
			}
		})
	})

	describe('Initialization', () => {
		it('should display a title', () => {
			expect(pullRequestList.find('[data-test=title]').text()).toBe('Pull requests on watched repositories')
		})

		it('should display a list of pull request', async () => {
			await triggerFakeNetworkResponse(pullRequestList)

			const pullRequestLine = pullRequestList.findAllComponents('[data-test=line]')
			expect(pullRequestLine.length).toBe(2)
			expect(pullRequestLine.at(0).props()).toEqual({
				title: 'WIP - feat(ivy): implement listing lazy routes in `ngtsc`',
				url: 'https://github.com/angular/angular/pull/27697',
				buildStatus: 'FAILURE',
				creationDate: new Date('2018-12-16T18:26:59Z'),
				hasUpdates: true,
				repositoryName: 'repo-name',
				statusesList: [
					{
						jobStatus: 'SUCCESS',
						description: 'continuous-integration/travis-ci/pr',
						jobUrl: 'https://travis-ci.org/angular/angular/builds/468759214?utm_source=github_status&utm_medium=notification'
					}
				]
			})
			expect(pullRequestLine.at(1).props()).toEqual({
				title: 'Fix wheel/touch browser locking in IE and Safari',
				url: 'https://github.com/facebook/react/pull/9333',
				buildStatus: 'FAILURE',
				creationDate: new Date('2018-10-20T00:00:00Z'),
				hasUpdates: false,
				repositoryName: 'repo-name',
				statusesList: [
					{
						jobStatus: 'SUCCESS',
						description: 'build description',
						jobUrl: 'http://build-target-url'
					}
				]
			})
		})

		it('should not display pull requests when graphql api returns an empty array of pull request for a repository', async () => {
			stubs.fakeResponseRead = []
			stubs.pullRequestReader.mockReturnValue(stubs.fakeResponseRead)

			await triggerFakeNetworkResponse(pullRequestList)

			expect(pullRequestList.find('[data-test=line]').exists()).toBe(false)
		})

		it('should display a list of pull request even when there is no build status on the pull request', async () => {
			stubs.fakeResponseRead[0].buildStatus = 'NO_STATUS'
			stubs.fakeResponseRead[0].statuses = []

			await triggerFakeNetworkResponse(pullRequestList)

			const pullRequestLine = pullRequestList.findComponent('[data-test=line]')
			expect(pullRequestLine.exists()).toBe(true)
			expect(pullRequestLine.props().buildStatus).toBe('NO_STATUS')
		})

		it('should send notification about new pull requests', async () => {
			await triggerFakeNetworkResponse(pullRequestList)

			expect(stubs.pullRequestNotifications.newList).toHaveBeenCalledWith([
				{
					title: 'WIP - feat(ivy): implement listing lazy routes in `ngtsc`',
					url: 'https://github.com/angular/angular/pull/27697'
				},
				{
					title: 'Fix wheel/touch browser locking in IE and Safari',
					url: 'https://github.com/facebook/react/pull/9333'
				}
			])
		})

		it('should work on api that are not limited', async () => {
			stubs.fakeGraphqlResponse.rateLimit = null

			await triggerFakeNetworkResponse(pullRequestList)

			expect(pullRequestList.find('[data-test=line]').exists()).toBe(true)
		})

		it('should call graphql api to retrieve data over the list of repositories', async () => {
			const networkPolling = pullRequestList.findComponent(NetworkPolling)

			expect(networkPolling.exists()).toBe(true)
			expect(networkPolling.attributes().query).toBe('graphql query')
		})

		it('should call reader service to read data from graphql api', async () => {
			await triggerFakeNetworkResponse(pullRequestList)

			expect(stubs.pullRequestReader).toHaveBeenCalledWith([
				{
					name: 'react',
					owner: { login: 'facebook' },
					url: 'https://github.com/facebook/react',
					pullRequests: {}
				},
				{
					name: 'angular',
					owner: {
						login: 'angular'
					},
					url: 'https://github.com/angular/angular',
					pullRequests: {}
				}
			])
		})

		const triggerFakeNetworkResponse = async (pullRequestList) => {
			const networkPolling = pullRequestList.findComponent('[data-test=network-polling]')
			await networkPolling.vm.$emit('http-update', stubs.fakeGraphqlResponse)
			await flushPromises()
		}
	})
})
