import { shallowMount, VueWrapper } from '@vue/test-utils'
import MainContainer from './main-container.vue'
import { beforeEach, describe, expect, it } from 'vitest'
import GithubApiConfig from '../../github-api-config/github-api-config.vue'
import RepositoryList from '../../repository-list/repository-list.vue'
import PullRequestList from '../../pull-request-list/pull-request-list.vue'
import RecentlyClosedPullRequests from '../../recently-closed-pull-requests/recently-closed-pull-requests.vue'

describe('MainContainer component', () => {
	let mainContainer: VueWrapper

	beforeEach(() => {
		mainContainer = shallowMount(MainContainer)
	})

	describe('Initialization', () => {
		it('should display configuration component', () => {
			expect(mainContainer.findComponent(GithubApiConfig).exists()).toBe(true)
		})

		it('should display repository list component', () => {
			expect(mainContainer.findComponent(RepositoryList).exists()).toBe(true)
		})

		it('should display pull request list component', () => {
			expect(mainContainer.findComponent(PullRequestList).exists()).toBe(true)
		})

		it('should display recently closed pull requests', () => {
			expect(mainContainer.findComponent(RecentlyClosedPullRequests).exists()).toBe(true)
		})
	})
})
