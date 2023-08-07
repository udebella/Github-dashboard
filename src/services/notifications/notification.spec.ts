import type { Dependencies } from './notification'
import { notificationApi } from './notification'
import { beforeEach, describe, expect, it, Mock, vitest } from 'vitest'

type Notification = {
	new (message: string): {}
	permission: NotificationPermission
	requestPermission: Mock
}

describe('NotificationAPI', () => {
	let notificationsMock: Notification
	let documentMock: Dependencies['document']

	beforeEach(() => {
		notificationsMock = vitest.fn() as unknown as Notification
		notificationsMock.requestPermission = vitest.fn().mockResolvedValue('denied')
		documentMock = {
			hidden: true
		}
	})

	describe('Notify', () => {
		it('does not create notification when user refused notifications', async () => {
			notificationsMock.permission = 'denied'
			const api = notificationApi({ Notification: notificationsMock, document: documentMock })

			await api.notify('Some notification')

			expect(notificationsMock).not.toHaveBeenCalled()
		})

		it('sends notifications when user accepted notifications after asking', async () => {
			notificationsMock.requestPermission.mockResolvedValue('granted')
			const api = notificationApi({ Notification: notificationsMock, document: documentMock })
			await api.requestNotifications()

			await api.notify('Some notification')

			expect(notificationsMock).toHaveBeenCalledWith('Some notification')
		})

		it('does not send notifications when user refused notifications after asking', async () => {
			notificationsMock.requestPermission.mockResolvedValue('denied')
			const api = notificationApi({ Notification: notificationsMock, document: documentMock })

			await api.notify('Some notification')

			expect(notificationsMock).not.toHaveBeenCalled()
		})

		it('does not send notifications when the page is displayed', async () => {
			notificationsMock.permission = 'granted'
			documentMock.hidden = false
			const api = notificationApi({ Notification: notificationsMock, document: documentMock })

			await api.notify('Some notification')

			expect(notificationsMock).not.toHaveBeenCalled()
		})

		it('creates a notification when user gave its permission', async () => {
			notificationsMock.permission = 'granted'

			const api = notificationApi({ Notification: notificationsMock, document: documentMock })
			await api.notify('Some notification')

			expect(notificationsMock).toHaveBeenCalledWith('Some notification')
		})
	})

	describe('RequestNotifications', () => {
		it('exposes a function to ask for notifications', async () => {
			notificationsMock.permission = 'default'
			const api = notificationApi({ Notification: notificationsMock, document: documentMock })

			await api.requestNotifications()

			expect(notificationsMock.requestPermission).toHaveBeenCalled()
		})
	})
})
