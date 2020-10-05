import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import ViewerPullRequestList from './viewer-pull-request-list.vue'
import {stub} from 'sinon'
import {viewerFragment} from './viewer-pull-request-list'

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
			queryBuilder: stub().returns('graphql query'),
			request: stub().returns(Promise.resolve({})),
			pullRequestReader: stub().returns(fakeReponseRead),
			userService: {connectedUser: stub().returns({login: 'udebella'})},
			fakeReponseRead,
			fakeGraphqlResponse,
		}
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			const viewerPullRequestList = shallowMount(ViewerPullRequestList, {propsData: stubs})

			expect(viewerPullRequestList.exists()).to.be.true
		})

		it('should display a title', () => {
			const viewerPullRequestList = shallowMount(ViewerPullRequestList, {propsData: stubs})

			expect(viewerPullRequestList.find('[data-test=title]').text()).to.equal('My currently open pull requests')
		})

		it('should call graphql api to retrieve data over the list of repositories', async () => {
			// Given
			stubs.queryBuilder.returns('queryBuilt')

			// When
			const viewerPullRequestList = shallowMount(ViewerPullRequestList, {propsData: stubs})

			// Then
			await triggerFakeNetworkResponse(viewerPullRequestList)
			expect(viewerPullRequestList.find('[data-test=network-polling]').props().query).to.equal('queryBuilt')
			expect(stubs.queryBuilder).to.have.been.calledWith(viewerFragment)
			expect(stubs.pullRequestReader).to.have.been.called
		})

		it('should not display pull requests when graphql api returns an empty array of pull request for a repository', async () => {
			// Given
			stubs.fakeReponseRead = []
			stubs.pullRequestReader.returns(stubs.fakeReponseRead)

			// When
			const viewerPullRequestList = shallowMount(ViewerPullRequestList, {propsData: stubs})

			// Then
			await triggerFakeNetworkResponse(viewerPullRequestList)
			expect(viewerPullRequestList.find('[data-test=line]').exists()).to.be.false
		})

		it('should display a list of pull request', async () => {
			// When
			const viewerPullRequestList = shallowMount(ViewerPullRequestList, {propsData: stubs})

			// Then
			await triggerFakeNetworkResponse(viewerPullRequestList)
			const viewerPullRequestLine = viewerPullRequestList.find('[data-test=line]')
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

		it('should display an update icon if an other user is the author of the last event', async () => {
			stubs.fakeReponseRead[0].lastEventAuthor = 'anOtherUser'

			// When
			const viewerPullRequestList = shallowMount(ViewerPullRequestList, {propsData: stubs})

			// Then
			await triggerFakeNetworkResponse(viewerPullRequestList)
			const viewerPullRequestLine = viewerPullRequestList.find('[data-test=line]')
			expect(viewerPullRequestLine.props().hasUpdates).to.be.true
		})

		const triggerFakeNetworkResponse = async viewerPullRequestList => {
			const networkPolling = viewerPullRequestList.find('[data-test=network-polling]')
			networkPolling.vm.$emit('http-update', stubs.fakeGraphqlResponse)
			await networkPolling.vm.$nextTick()
		}
	})
})
