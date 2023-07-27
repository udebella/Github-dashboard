import {shallowMount} from '@vue/test-utils'
import PullRequestLine from './pull-request-line.vue'
import {beforeEach, describe, expect, it} from "vitest";

describe('PullRequestLine component', () => {
	let pullRequestLine
	const today = new Date()

	beforeEach(() => {
		pullRequestLine = shallowMount(PullRequestLine, {
			propsData: {
				title: 'Pull request name',
				url: 'http://pull-request-url',
				buildStatus: 'SUCCESS',
				creationDate: today,
				hasUpdates: true,
				statusesList: [{
					jobStatus: 'SUCCESS',
					description: 'build description',
					jobUrl: 'http://build-target-url',
				}],
			},
			global: {
				renderStubDefaultSlot: true
			}
		})
	})

	describe('Initialization', () => {
		it('should mount properly', () => {
			expect(pullRequestLine.exists()).toBe(true)
		})
	})

	describe('Display', () => {
		it('should display the pull request name', () => {
			expect(pullRequestLine.find('[data-test=name]').text()).toBe('Pull request name')
		})

		it('should display a link to the pull request', () => {
			expect(pullRequestLine.find('[data-test=link]').attributes().href).toBe('http://pull-request-url')
		})

		it('should display the build status of the pull request', () => {
			expect(pullRequestLine.find('[data-test=name]').classes()).toEqual(['SUCCESS', 'line'])
		})

		it('should display a living icon', () => {
			const livingIcon = pullRequestLine.findComponent('[data-test=living-icon]')

			expect(livingIcon.exists()).toBe(true)
			expect(livingIcon.props().date).toBe(today)
		})

		it('should display an update icon', () => {
			const updateIcon = pullRequestLine.find('[data-test=update-icon]')

			expect(updateIcon.exists()).toBe(true)
		})

		it('should not display the update icon when there are no updates', () => {
			pullRequestLine = shallowMount(PullRequestLine, {
				propsData: {
					title: 'Pull request name',
					url: 'http://pull-request-url',
					buildStatus: 'SUCCESS',
					creationDate: today,
					hasUpdates: false,
					statusesList: [{
						jobStatus: 'SUCCESS',
						description: 'build description',
						jobUrl: 'http://build-target-url',
					}],
				},
			})
			const updateIcon = pullRequestLine.find('[data-test=update-icon]')

			expect(updateIcon.exists()).toBe(false)
		})
	})

	describe('Build statuses', () => {
		let buildStatuses

		beforeEach(() => {
			buildStatuses = pullRequestLine.findComponent({name: 'build-statuses'})
		})

		it('should display build statuses', () => {
			expect(buildStatuses.exists()).toBe(true)
		})

		it('should give the list of statuses to the component', () => {
			expect(buildStatuses.props().statuses).toEqual([{
				jobStatus: 'SUCCESS',
				description: 'build description',
				jobUrl: 'http://build-target-url',
			}])
		})

		it('should not display build statuses when there is no build status associated with the commit', () => {
			pullRequestLine = shallowMount(PullRequestLine, {
				propsData: {
					title: 'Pull request name',
					url: 'http://pull-request-url',
					buildStatus: 'SUCCESS',
					creationDate: today,
					hasUpdates: true,
				},
			})

			buildStatuses = pullRequestLine.findComponent({name: 'build-statuses'})
			expect(buildStatuses.exists()).toBe(false)
		})
	})
})
