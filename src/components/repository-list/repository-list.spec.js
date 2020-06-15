import {shallowMount} from '@vue/test-utils'
import {expect} from 'chai'
import {stub} from 'sinon'
import RepositoryList from './repository-list.vue'

describe('RepositoryList component', () => {
	let repositoryList, stubs

	beforeEach(() => {
		const store = {
			state: {watchedRepositories: [{name: 'repository', owner: 'user'}]},
		}
		const fakeGraphQlResponse = {
			rep_0: {
				name: 'repository',
				owner: {login: 'user'},
				url: 'http://repository-url',
				defaultBranchRef: {
					target: {
						status: {
							contexts: [
								{
									state: 'SUCCESS',
									context: 'build description',
									targetUrl: 'http://build-target-url',
								},
							],
							state: 'SUCCESS',
						},
					},
				},
			},
			rateLimit: {
				cost: 1,
				limit: 5000,
				remaining: 4999,
				resetAt: '2018-10-21T14:33:46Z',
			},
		}
		stubs = {
			queryBuilder: stub().returns('graphql query'),
			request: stub().returns(Promise.resolve(fakeGraphQlResponse)),
			fakeGraphQlResponse,
			store,
		}

		repositoryList = shallowMount(RepositoryList, {store, propsData: stubs})
	})

	describe('Initialisation', () => {
		it('should mount properly', () => {
			expect(repositoryList.exists()).to.be.true
		})

		it('should display a title', () => {
			expect(repositoryList.find('[data-test=title]').text()).to.equals('Watched repositories')
		})

		it('should display a list of repositories', async () => {
			// When
			repositoryList = shallowMount(RepositoryList, {store: stubs.store, propsData: stubs})

			// Then
			await triggerNetworkResponse()
			const repositoryLine = repositoryList.find('[data-test=repository-line]')
			expect(repositoryLine.exists()).to.be.true
			expect(repositoryLine.props().repository).to.deep.equal({
				name: 'repository',
				owner: 'user',
				repositoryUrl: 'http://repository-url',
				branchStatus: 'SUCCESS',
				statusesList: [{
					jobStatus: 'SUCCESS',
					description: 'build description',
					jobUrl: 'http://build-target-url',
				}],
			})
		})

		it('should display list of repositories even without build status', async () => {
			// Given
			stubs.fakeGraphQlResponse.rep_0.defaultBranchRef.target.status = null

			// When
			repositoryList = shallowMount(RepositoryList, {store: stubs.store, propsData: stubs})

			// Then
			await triggerNetworkResponse()
			const repositoryLine = repositoryList.find('[data-test=repository-line]')
			expect(repositoryLine.exists()).to.be.true
			expect(repositoryLine.props().repository).to.deep.equal({
				name: 'repository',
				owner: 'user',
				repositoryUrl: 'http://repository-url',
				branchStatus: 'NO_STATUS',
				statusesList: [],
			})
		})

		it('should display list of repositories even without build status', async () => {
			// Given
			stubs.fakeGraphQlResponse.rateLimit = null

			// When
			repositoryList = shallowMount(RepositoryList, {store: stubs.store, propsData: stubs})

			// Then
			await triggerNetworkResponse()
			expect(repositoryList.find('[data-test=repository-line]').exists()).to.be.true
		})

		it('should call graphql api to retrieve data over the list of repositories', async () => {
			// When
			shallowMount(RepositoryList, {store: stubs.store, propsData: stubs})

			// Then
			expect(repositoryList.find('[data-test=polling]').attributes().query).to.equals('graphql query')
		})

		it('should not display anything if the list is empty', () => {
			// Given
			stubs.store.state.watchedRepositories = []

			// When
			const repositoryList = shallowMount(RepositoryList, {store: stubs.store, propsData: stubs})

			// Then
			expect(repositoryList.find('[data-test=repository-line]').exists()).to.be.false
		})

		it('should display a repository adder component', () => {
			expect(repositoryList.find('[data-test=repository-adder]').exists()).to.be.true
		})

		const triggerNetworkResponse = async () => {
			const networkPolling = repositoryList.find('[data-test=polling]')
			networkPolling.vm.$emit('httpUpdate', stubs.fakeGraphQlResponse)
			await repositoryList.vm.$nextTick()
		}
	})
})
