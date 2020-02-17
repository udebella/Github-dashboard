import {expect} from 'chai'
import {stub} from 'sinon'
import {notificationApi} from './notification'

describe('NotificationAPI', () => {
	let stubs

	beforeEach(() => {
		const Notification = stub()
		Notification.requestPermission = stub().returns(Promise.resolve('denied'))

		stubs = {Notification}
	})

	it('should create a notification when user gave its permission', async () => {
		stubs.Notification.permission = 'granted'

		const api = notificationApi(stubs)
		await api.notify('Some notification')

		expect(stubs.Notification).to.have.been.calledWith('Some notification')
	})

	it('should not create notification when user refused notifications', async () => {
		stubs.Notification.permission = 'denied'

		const api = notificationApi(stubs)
		await api.notify('Some notification')

		expect(stubs.Notification).not.to.have.been.called
	})

	it('should ask for permission before sending notifications', () => {
		notificationApi(stubs)

		expect(stubs.Notification.requestPermission).to.have.been.called
	})

	it('should send notifications when user accepted notifications after asking', async () => {
		stubs.Notification.requestPermission.returns(Promise.resolve('granted'))
		const api = notificationApi(stubs)

		await api.notify('Some notification')

		expect(stubs.Notification).to.have.been.calledWith('Some notification')
	})

	it('should send notifications when user accepted notifications after asking', async () => {
		stubs.Notification.requestPermission.returns(Promise.resolve('granted'))
		const api = notificationApi(stubs)

		await api.notify('Hello')

		expect(stubs.Notification).to.have.been.calledWith('Hello')
	})

	it('should not send notifications when user refused notifications after asking', async () => {
		stubs.Notification.requestPermission.returns(Promise.resolve('denied'))
		const api = notificationApi(stubs)

		await api.notify('Some notification')

		expect(stubs.Notification).not.to.have.been.called
	})
})
