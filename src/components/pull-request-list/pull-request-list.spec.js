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
			pullRequests: {},
		}
		const fakeAngularResponse = {
			name: 'angular',
			owner: {
				login: 'angular',
			},
			url: 'https://github.com/angular/angular',
			pullRequests: {},
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

		const fakeResponseRead = [{
			prTitle: 'WIP - feat(ivy): implement listing lazy routes in `ngtsc`',
			prUrl: 'https://github.com/angular/angular/pull/27697',
			creationDate: new Date('2018-12-16T18:26:59.000Z'),
			updateDate: new Date('2018-12-16T21:05:45Z'),
			lastEventAuthor: 'anUser',
			buildStatus: 'FAILURE',
			statuses: [{
				jobStatus: 'SUCCESS',
				description: 'continuous-integration/travis-ci/pr',
				jobUrl: 'https://travis-ci.org/angular/angular/builds/468759214?utm_source=github_status&utm_medium=notification',
			}],
		}, {
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
			request: stub().returns(Promise.resolve(fakeGraphqlResponse)),
			queryBuilder: stub().returns('graphql query'),
			pullRequestReader: stub().returns(fakeResponseRead),
			userService: {connectedUser: stub().returns({login: 'udebella'})},
			fakeGraphqlResponse,
			fakeResponseRead,
			store,
		}

		pullRequestList = shallowMount(PullRequestList, {store, propsData: stubs})
	})

	describe('Initialization', () => {
		it('should have the right component name', () => {
			expect(pullRequestList.name()).to.equal('pull-request-list')
		})

		it('should display a title', () => {
			expect(pullRequestList.find('[data-test=title]').text()).to.equals('Pull requests on watched repositories')
		})

		it('should display a when the last network call was done', () => {
			const networkPolling = pullRequestList.find('[data-test=network-polling]')

			expect(networkPolling.exists()).to.be.true
			expect(networkPolling.attributes().query).to.equals('graphql query')
		})

		it('should display a list of pull request', async () => {
			// When
			const pullRequestList = shallowMount(PullRequestList, {store: stubs.store, propsData: stubs})
			const networkPolling = pullRequestList.find('[data-test=network-polling]')

			// Then
			networkPolling.vm.$emit('httpUpdate', stubs.fakeGraphqlResponse)
			const pullRequestLine = pullRequestList.findAll('[data-test=line]')
			expect(pullRequestLine.length).to.equal(2)
			expect(pullRequestLine.at(0).props()).to.deep.equals({
				title: 'WIP - feat(ivy): implement listing lazy routes in `ngtsc`',
				url: 'https://github.com/angular/angular/pull/27697',
				buildStatus: 'FAILURE',
				creationDate: new Date('2018-12-16T18:26:59Z'),
				hasUpdates: true,
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
			stubs.fakeResponseRead = []
			stubs.pullRequestReader.returns(stubs.fakeResponseRead)

			// When
			const pullRequestList = shallowMount(PullRequestList, {store: stubs.store, propsData: stubs})

			// Then
			const networkPolling = pullRequestList.find('[data-test=network-polling]')
			networkPolling.vm.$emit('httpUpdate', stubs.fakeGraphqlResponse)
			expect(pullRequestList.contains('[data-test=line]')).to.be.false
		})

		it('should display a list of pull request even when there is no build status on the pull request', async () => {
			// Given
			stubs.fakeResponseRead[0].buildStatus = 'NO_STATUS'
			stubs.fakeResponseRead[0].statuses = []

			// When
			const pullRequestList = shallowMount(PullRequestList, {store: stubs.store, propsData: stubs})

			// Then
			const networkPolling = pullRequestList.find('[data-test=network-polling]')
			networkPolling.vm.$emit('httpUpdate', stubs.fakeGraphqlResponse)
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
			const networkPolling = pullRequestList.find('[data-test=network-polling]')
			networkPolling.vm.$emit('httpUpdate', stubs.fakeGraphqlResponse)
			expect(pullRequestList.contains('[data-test=line]')).to.be.true
		})

		it('should call graphql api to retrieve data over the list of repositories', async () => {
			// Given
			stubs.queryBuilder.returns('queryBuilt')

			// When
			shallowMount(PullRequestList, {store: stubs.store, propsData: stubs})

			// Then
			const networkPolling = pullRequestList.find('[data-test=network-polling]')
			networkPolling.vm.$emit('httpUpdate', stubs.fakeGraphqlResponse)
			expect(stubs.request).to.have.been.calledWith('queryBuilt')
		})

		it('should call reader service to read data from graphql api', async () => {
			// When
			shallowMount(PullRequestList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
			expect(stubs.pullRequestReader).to.have.been.deep.calledWith([{
				name: 'react',
				owner: {login: 'facebook'},
				url: 'https://github.com/facebook/react',
				pullRequests: {},
			}, {
				name: 'angular',
				owner: {
					login: 'angular',
				},
				url: 'https://github.com/angular/angular',
				pullRequests: {},
			}])
		})
	})
})
