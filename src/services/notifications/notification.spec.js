import {notificationApi} from './notification'
import {beforeEach, describe, expect, it, vitest} from "vitest";

describe('NotificationAPI', () => {
	let stubs

	beforeEach(() => {
		const Notification = vitest.fn()
		Notification.requestPermission = vitest.fn().mockResolvedValue('denied')
		const document = {
			hidden: true,
		}

		stubs = {Notification, document}
	})

	it('should create a notification when user gave its permission', async () => {
		stubs.Notification.permission = 'granted'

		const api = notificationApi(stubs)
		await api.notify('Some notification')

		expect(stubs.Notification).toHaveBeenCalledWith('Some notification')
	})

	it('should not create notification when user refused notifications', async () => {
		stubs.Notification.permission = 'denied'

		const api = notificationApi(stubs)
		await api.notify('Some notification')

		expect(stubs.Notification).not.toHaveBeenCalled()
	})

	it('should ask for permission before sending notifications', () => {
		notificationApi(stubs)

		expect(stubs.Notification.requestPermission).toHaveBeenCalled()
	})

	it('should send notifications when user accepted notifications after asking', async () => {
		stubs.Notification.requestPermission.mockResolvedValue('granted')
		const api = notificationApi(stubs)

		await api.notify('Some notification')

		expect(stubs.Notification).toHaveBeenCalledWith('Some notification')
	})

	it('should not send notifications when user refused notifications after asking', async () => {
		stubs.Notification.requestPermission.mockResolvedValue('denied')
		const api = notificationApi(stubs)

		await api.notify('Some notification')

		expect(stubs.Notification).not.toHaveBeenCalled()
	})

	it('should not send notifications when the page is displayed', async () => {
		stubs.Notification.permission = 'granted'
		stubs.document.hidden = false
		const api = notificationApi(stubs)

		await api.notify('Some notification')

		expect(stubs.Notification).not.toHaveBeenCalled()
	})
})
