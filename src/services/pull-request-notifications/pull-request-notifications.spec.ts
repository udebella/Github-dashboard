import { type Dependencies, pullRequestNotifications } from './pull-request-notifications.ts'
import { beforeEach, describe, expect, it, vitest } from 'vitest'
import type { Mocks } from '../../test-utils.ts'

describe('Pull request notification service', () => {
	let pullRequestNotification: ReturnType<typeof pullRequestNotifications>
	let stubs: Mocks<Dependencies>
	beforeEach(() => {
		stubs = {
			notificationApi: {
				notify: vitest.fn(),
				requestNotifications: vitest.fn()
			}
		}

		pullRequestNotification = pullRequestNotifications(stubs)
	})

	it('should not send notifications when there is no new pull request', () => {
		pullRequestNotification.newList([])

		expect(stubs.notificationApi.notify).not.toHaveBeenCalled()
	})

	it('should send notifications when there is a new pull request', () => {
		pullRequestNotification.newList([{ title: 'Test pull request', url: '/a/random/url' }])

		expect(stubs.notificationApi.notify).toHaveBeenCalledWith('A new pull request was opened: Test pull request')
	})

	it('should send notifications when there is multiple new pull requests', () => {
		pullRequestNotification.newList([
			{ title: 'Test pull request', url: '/a/random/url' },
			{ title: 'Another test pull request', url: '/a/random/url' }
		])

		expect(stubs.notificationApi.notify).toHaveBeenCalledWith('2 new pull requests were opened')
	})

	it('should send notifications only for new pull requests', () => {
		pullRequestNotification.newList([{ title: 'Test pull request', url: '/a/random/url' }])
		stubs.notificationApi.notify.mockClear()

		pullRequestNotification.newList([
			{ title: 'Test pull request', url: '/a/random/url' },
			{ title: 'Another test pull request', url: '/a/random/url' }
		])

		expect(stubs.notificationApi.notify).toHaveBeenCalledWith(
			'A new pull request was opened: Another test pull request'
		)
	})

	it('should keep already notified pull request', () => {
		pullRequestNotification.newList([{ title: 'Test pull request', url: '/a/random/url' }])
		pullRequestNotification.newList([])
		stubs.notificationApi.notify.mockClear()

		pullRequestNotification.newList([
			{ title: 'Test pull request', url: '/a/random/url' },
			{ title: 'Another test pull request', url: '/a/random/url' }
		])

		expect(stubs.notificationApi.notify).toHaveBeenCalledWith(
			'A new pull request was opened: Another test pull request'
		)
	})
})
