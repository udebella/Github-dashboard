import { shallowMount, VueWrapper } from '@vue/test-utils'
import PullRequestLine from './pull-request-line.vue'
import { beforeEach, describe, expect, it } from 'vitest'
import BadgeStatus from '../badge-status/badge-status.vue'
import LivingIcon from '../living-icon/living-icon.vue'
import BuildStatuses from '../build-statuses/build-statuses.vue'
import UpdateIcon from '../update-icon/update-icon.vue'

describe('PullRequestLine component', () => {
	let pullRequestLine: VueWrapper
	const today = new Date()

	beforeEach(() => {
		pullRequestLine = shallowMount(PullRequestLine, {
			propsData: {
				title: 'Pull request name',
				url: 'http://pull-request-url',
				buildStatus: 'SUCCESS',
				creationDate: today,
				hasUpdates: true,
				statusesList: [
					{
						jobStatus: 'SUCCESS',
						description: 'build description',
						jobUrl: 'http://build-target-url'
					}
				]
			},
			global: {
				renderStubDefaultSlot: true
			}
		})
	})

	describe('Display', () => {
		it('should display the pull request name', () => {
			expect(pullRequestLine.findComponent(BadgeStatus).text()).toBe('Pull request name')
		})

		it('should display a link to the pull request', () => {
			expect(pullRequestLine.find('[data-test=link]').attributes().href).toBe('http://pull-request-url')
		})

		it('should display the build status of the pull request', () => {
			expect(pullRequestLine.findComponent(BadgeStatus).props().status).toBe('SUCCESS')
		})

		it('should display a living icon', () => {
			const livingIcon = pullRequestLine.findComponent(LivingIcon)

			expect(livingIcon.exists()).toBe(true)
			expect(livingIcon.props().date).toBe(today)
		})

		it('should display an update icon', () => {
			const updateIcon = pullRequestLine.findComponent(UpdateIcon)

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
					statusesList: [
						{
							jobStatus: 'SUCCESS',
							description: 'build description',
							jobUrl: 'http://build-target-url'
						}
					]
				}
			})
			const updateIcon = pullRequestLine.findComponent(UpdateIcon)

			expect(updateIcon.exists()).toBe(false)
		})
	})

	describe('Build statuses', () => {
		let buildStatuses: VueWrapper

		beforeEach(() => {
			buildStatuses = pullRequestLine.findComponent(BuildStatuses)
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
			pullRequestLine = shallowMount(PullRequestLine, {
				propsData: {
					title: 'Pull request name',
					url: 'http://pull-request-url',
					buildStatus: 'SUCCESS',
					creationDate: today,
					hasUpdates: true
				}
			})

			buildStatuses = pullRequestLine.findComponent(BuildStatuses)
			expect(buildStatuses.exists()).toBe(false)
		})
	})
})
