import {shallowMount} from '@vue/test-utils'
import RepositoryList from './repository-list.vue'
import {beforeEach, describe, expect, it, vitest} from "vitest";
import {useRepositoryStore} from "@/stores/repositories";
import {createPinia, setActivePinia} from "pinia";

describe('RepositoryList component', () => {
	let repositoryList, stubs

	beforeEach(() => {
		setActivePinia(createPinia())
		useRepositoryStore().$patch({
			watched: [{name: 'repository', owner: 'user'}],
		})
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
			queryBuilder: vitest.fn().mockReturnValue('graphql query'),
			request: vitest.fn().mockResolvedValue(fakeGraphQlResponse),
			fakeGraphQlResponse,
		}

		repositoryList = shallowMount(RepositoryList, {propsData: stubs})
	})

	describe('Initialisation', () => {
		it('should mount properly', () => {
			expect(repositoryList.exists()).toBe(true)
		})

		it('should display a title', () => {
			expect(repositoryList.find('[data-test=title]').text()).toBe('Watched repositories')
		})

		it('should display a list of repositories', async () => {
			// When
			repositoryList = shallowMount(RepositoryList, {propsData: stubs})

			// Then
			await triggerNetworkResponse()
			const repositoryLine = repositoryList.findComponent('[data-test=repository-line]')
			expect(repositoryLine.exists()).toBe(true)
			expect(repositoryLine.props().repository).toEqual({
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
			repositoryList = shallowMount(RepositoryList, {propsData: stubs})

			// Then
			await triggerNetworkResponse()
			const repositoryLine = repositoryList.findComponent('[data-test=repository-line]')
			expect(repositoryLine.exists()).toBe(true)
			expect(repositoryLine.props().repository).toEqual({
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
			repositoryList = shallowMount(RepositoryList, {propsData: stubs})

			// Then
			await triggerNetworkResponse()
			expect(repositoryList.find('[data-test=repository-line]').exists()).toBe(true)
		})

		it('should call graphql api to retrieve data over the list of repositories', async () => {
			// When
			shallowMount(RepositoryList, {propsData: stubs})

			// Then
			expect(repositoryList.find('[data-test=polling]').attributes().query).toBe('graphql query')
		})

		it('should not display anything if the list is empty', () => {
			// Given
			useRepositoryStore().$patch({ watched: []});

			// When
			const repositoryList = shallowMount(RepositoryList, {propsData: stubs})

			// Then
			expect(repositoryList.find('[data-test=repository-line]').exists()).toBe(false)
		})

		it('should display a repository adder component', () => {
			expect(repositoryList.find('[data-test=repository-adder]').exists()).toBe(true)
		})

		const triggerNetworkResponse = async () => {
			const networkPolling = repositoryList.findComponent('[data-test=polling]')
			await networkPolling.vm.$emit('http-update', stubs.fakeGraphQlResponse)
		}
	})
})
