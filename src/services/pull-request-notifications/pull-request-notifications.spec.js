import {expect} from 'chai'
import {stub} from 'sinon'
import {pullRequestNotifications} from './pull-request-notifications'

describe('Pull request notification service', () => {
	let stubs
	beforeEach(() => {
		const notify = stub()
		const notificationApi = () => ({
			notify,
		})
		stubs = {
			notificationApi,
			notify,
		}
	})

	it('should not send notifications when there is no new pull request', () => {
		const pullRequestNotification = pullRequestNotifications(stubs)

		pullRequestNotification.newList([])

		expect(stubs.notify).not.to.have.been.called
	})

	it('should send notifications when there is a new pull request', () => {
		const pullRequestNotification = pullRequestNotifications(stubs)

		pullRequestNotification.newList([{title: 'Test pull request', url: '/a/random/url'}])

		expect(stubs.notify).to.have.been.calledWith('A new pull request was opened: Test pull request')
	})

	it('should send notifications when there is multiple new pull requests', () => {
		const pullRequestNotification = pullRequestNotifications(stubs)

		pullRequestNotification.newList([
			{title: 'Test pull request', url: '/a/random/url'},
			{title: 'Another test pull request', url: '/a/random/url'},
		])

		expect(stubs.notify).to.have.been.calledWith('2 new pull requests were opened')
	})
})
