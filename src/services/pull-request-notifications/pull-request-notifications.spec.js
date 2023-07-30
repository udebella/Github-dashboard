import { pullRequestNotifications } from './pull-request-notifications'
import { beforeEach, describe, expect, it, vitest } from 'vitest'

describe('Pull request notification service', () => {
	let stubs
	beforeEach(() => {
		const notify = vitest.fn()
		const notificationApi = () => ({
			notify
		})
		stubs = {
			notificationApi,
			notify
		}
	})

	it('should not send notifications when there is no new pull request', () => {
		const pullRequestNotification = pullRequestNotifications(stubs)

		pullRequestNotification.newList([])

		expect(stubs.notify).not.toHaveBeenCalled()
	})

	it('should send notifications when there is a new pull request', () => {
		const pullRequestNotification = pullRequestNotifications(stubs)

		pullRequestNotification.newList([{ title: 'Test pull request', url: '/a/random/url' }])

		expect(stubs.notify).toHaveBeenCalledWith('A new pull request was opened: Test pull request')
	})

	it('should send notifications when there is multiple new pull requests', () => {
		const pullRequestNotification = pullRequestNotifications(stubs)

		pullRequestNotification.newList([
			{ title: 'Test pull request', url: '/a/random/url' },
			{ title: 'Another test pull request', url: '/a/random/url' }
		])

		expect(stubs.notify).toHaveBeenCalledWith('2 new pull requests were opened')
	})

	it('should send notifications only for new pull requests', () => {
		const pullRequestNotification = pullRequestNotifications(stubs)
		pullRequestNotification.newList([{ title: 'Test pull request', url: '/a/random/url' }])
		stubs.notify.mockClear()

		pullRequestNotification.newList([
			{ title: 'Test pull request', url: '/a/random/url' },
			{ title: 'Another test pull request', url: '/a/random/url' }
		])

		expect(stubs.notify).toHaveBeenCalledWith(
			'A new pull request was opened: Another test pull request'
		)
	})

	it('should keep already notified pull request', () => {
		const pullRequestNotification = pullRequestNotifications(stubs)
		pullRequestNotification.newList([{ title: 'Test pull request', url: '/a/random/url' }])
		pullRequestNotification.newList([])
		stubs.notify.mockClear()

		pullRequestNotification.newList([
			{ title: 'Test pull request', url: '/a/random/url' },
			{ title: 'Another test pull request', url: '/a/random/url' }
		])

		expect(stubs.notify).toHaveBeenCalledWith(
			'A new pull request was opened: Another test pull request'
		)
	})
})
