import { DOMWrapper, shallowMount, type VueWrapper } from '@vue/test-utils'
import RepositoryLine from './repository-line.vue'
import { beforeEach, describe, expect, it } from 'vitest'
import BadgeStatus from '../badge-status/badge-status.vue'

describe('RepositoryLine component', () => {
	let repositoryLine: VueWrapper

	beforeEach(() => {
		repositoryLine = shallowMount(RepositoryLine, {
			props: {
				repository: {
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
				}
			},
			global: {
				renderStubDefaultSlot: true
			}
		})
	})

	describe('Initialization', () => {
		it('should use the color on the line according to the branch status', () => {
			expect(repositoryLine.findComponent(BadgeStatus).props().status).toBe('SUCCESS')
		})

		it('should display a way to remove the repository from watched repositories', () => {
			expect(repositoryLine.find('[data-test=trash]').exists()).toBe(true)
		})
	})

	describe('Repository link', () => {
		let repositoryLink: DOMWrapper<Node>

		beforeEach(() => {
			repositoryLink = repositoryLine.find('[data-test=link]')
		})

		it('should display a repository link', () => {
			expect(repositoryLink.exists()).toBe(true)
		})

		it('should give a repository name to the component', () => {
			expect(repositoryLink.text()).toBe('repository')
		})

		it('should give a repository url to the component', () => {
			expect(repositoryLink.attributes().href).toBe('http://repository-url')
		})
	})

	describe('Build statuses', () => {
		let buildStatuses: VueWrapper

		beforeEach(() => {
			buildStatuses = repositoryLine.findComponent({ name: 'build-statuses' })
		})

		it('should display build statuses', () => {
			expect(buildStatuses.exists()).toBe(true)
		})

		it('should give the list of statuses to the component', () => {
			expect(buildStatuses.props().statuses).toEqual([
				{
					jobStatus: 'SUCCESS',
					description: 'build description',
					jobUrl: 'http://build-target-url'
				}
			])
		})

		it('should not display build statuses when there is no build status associated with the commit', () => {
			repositoryLine = shallowMount(RepositoryLine, {
				propsData: {
					repository: {
						name: 'repository',
						owner: 'user',
						repositoryUrl: 'http://repository-url',
						branchStatus: 'SUCCESS',
						statusesList: []
					}
				}
			})

			buildStatuses = repositoryLine.findComponent({ name: 'build-statuses' })
			expect(buildStatuses.exists()).toBe(false)
		})
	})
})
