type Notification = {
	new (message: string): object
	permission: NotificationPermission
	requestPermission: () => Promise<NotificationPermission>
}

type Document = {
	hidden: boolean
}

export type Dependencies = {
	Notification: Notification
	document: Document
}

const defaultDependencies: Dependencies = {
	Notification: window.Notification,
	document: window.document
}

export const notificationApi = ({ Notification, document }: Dependencies = defaultDependencies) => {
	let authorizedNotification = Notification.permission === 'granted'

	const notify = (notification: string) => {
		if (document.hidden && authorizedNotification) {
			new Notification(notification)
		}
	}

	const requestNotifications = async () => {
		const userAnswer = await Notification.requestPermission()
		authorizedNotification = userAnswer === 'granted'
	}

	return {
		notify,
		requestNotifications
	}
}

export default notificationApi()
