import {shallowMount} from '@vue/test-utils'
import {expect} from 'chai'
import {stub} from 'sinon'
import RepositoryList from './repository-list.vue'
import flushPromises from 'flush-promises'

describe('RepositoryList component', () => {
	let repositoryList
	let stubs

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
			queryBuilder: stub(),
			request: stub().returns(Promise.resolve(fakeGraphQlResponse)),
			fakeGraphQlResponse,
			store,
		}

		repositoryList = shallowMount(RepositoryList, {store, propsData: stubs})
	})

	describe('Initialisation', () => {
		it('should have repository-list name', () => {
			expect(repositoryList.name()).to.equals('repository-list')
		})

		it('should display a title', () => {
			expect(repositoryList.find('[data-test=title]').text()).to.equals('Watched repositories')
		})

		it('should display the date of last network request', () => {
			expect(repositoryList.find('[data-test=polling]').exists()).to.be.true
		})

		it('should display a list of repositories', async () => {
			// When
			const repositoryList = shallowMount(RepositoryList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
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
			const repositoryList = shallowMount(RepositoryList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
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
			const repositoryList = shallowMount(RepositoryList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
			expect(repositoryList.contains('[data-test=repository-line]')).to.be.true
		})

		it('should call graphql api to retrieve data over the list of repositories', async () => {
			// Given
			stubs.queryBuilder.returns('queryBuilt')

			// When
			shallowMount(RepositoryList, {store: stubs.store, propsData: stubs})

			// Then
			await flushPromises()
			expect(stubs.request).to.have.been.calledWith('queryBuilt')
		})

		it('should not display anything if the list is empty', () => {
			// Given
			stubs.store.state.watchedRepositories = []

			// When
			const repositoryList = shallowMount(RepositoryList, {store: stubs.store, propsData: stubs})

			// Then
			expect(repositoryList.contains('[data-test=repository-line]')).to.be.false
		})

		it('should display a repository adder component', () => {
			expect(repositoryList.find('[data-test=repository-adder]').exists()).to.be.true
		})
	})
})
