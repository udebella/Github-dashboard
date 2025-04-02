import { shallowMount } from '@vue/test-utils'
import RepositoryList from './repository-list.vue'
import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useRepositoryStore } from '../../stores/repositories/repositories'
import RepositoryLine from '../ui/repository-line/repository-line.vue'
import NetworkPolling from '../network-polling/network-polling.js'

describe('RepositoryList component', () => {
	let repositoryList, stubs

	beforeEach(() => {
		setActivePinia(createPinia())
		useRepositoryStore().$patch({
			watched: [{ name: 'repository', owner: 'user' }]
		})
		const fakeGraphQlResponse = {
			rep_0: {
				name: 'repository',
				owner: { login: 'user' },
				url: 'http://repository-url',
				defaultBranchRef: {
					target: {
						statusCheckRollup: {
							contexts: {
								nodes: [
									{
										state: 'SUCCESS',
										context: 'build description',
										targetUrl: 'http://build-target-url'
									}
								]
							},
							state: 'SUCCESS'
						}
					}
				}
			},
			rateLimit: {
				cost: 1,
				limit: 5000,
				remaining: 4999,
				resetAt: '2018-10-21T14:33:46Z'
			}
		}
		stubs = {
			queryBuilder: vitest.fn().mockReturnValue('graphql query'),
			fakeGraphQlResponse
		}

		repositoryList = shallowMount(RepositoryList, { global: { provide: { queryBuilder: stubs.queryBuilder } } })
	})

	describe('Initialisation', () => {
		it('should display a title', () => {
			expect(repositoryList.find('[data-test=title]').text()).toBe('Watched repositories')
		})

		it('should display a list of repositories', async () => {
			await triggerNetworkResponse()

			const repositoryLine = repositoryList.findComponent(RepositoryLine)
			expect(repositoryLine.props().repository).toEqual({
				name: 'repository',
				owner: 'user',
				repositoryUrl: 'http://repository-url',
				branchStatus: 'SUCCESS',
				statusesList: [
					{
						jobStatus: 'SUCCESS',
						description: 'build description',
						jobUrl: 'http://build-target-url'
					}
				]
			})
		})

		it('should display list of repositories even without build status', async () => {
			stubs.fakeGraphQlResponse.rep_0.defaultBranchRef.target.statusCheckRollup = null

			await triggerNetworkResponse()

			const repositoryLine = repositoryList.findComponent(RepositoryLine)
			expect(repositoryLine.props().repository).toEqual({
				name: 'repository',
				owner: 'user',
				repositoryUrl: 'http://repository-url',
				branchStatus: 'NO_STATUS',
				statusesList: []
			})
		})

		it('should display list of repositories even without rate limit', async () => {
			stubs.fakeGraphQlResponse.rateLimit = null

			await triggerNetworkResponse()

			expect(repositoryList.findComponent(RepositoryLine).exists()).toBe(true)
		})

		it('should call graphql api to retrieve data over the list of repositories', async () => {
			expect(repositoryList.findComponent(NetworkPolling).props().query).toBe('graphql query')
		})

		it('should not display repositories by default', () => {
			expect(repositoryList.findComponent(RepositoryLine).exists()).toBe(false)
		})

		it('should display a repository adder component', () => {
			expect(repositoryList.find('[data-test=repository-adder]').exists()).toBe(true)
		})

		const triggerNetworkResponse = async () => {
			const networkPolling = repositoryList.findComponent(NetworkPolling)
			await networkPolling.vm.$emit('http-update', stubs.fakeGraphQlResponse)
		}
	})
})
