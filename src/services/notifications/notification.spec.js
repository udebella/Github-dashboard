import {expect} from 'chai'
import {stub} from 'sinon'
import {notificationApi} from './notification'

describe('NotificationAPI', () => {
	it('should create a notification when user gave its permission', () => {
		const Notification = stub()
		Notification.permission = 'granted'
		Notification.requestPermission = stub()

		const api = notificationApi({Notification})
		api.notify('Some notification')

		expect(Notification).to.have.been.calledWith('Some notification')
	})
})
