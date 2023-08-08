type Notification = {
	new (message: string): {}
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
	let authorizedNotification: Promise<boolean>

	if (Notification.permission === 'denied') {
		authorizedNotification = Promise.resolve(false)
	} else if (Notification.permission === 'granted') {
		authorizedNotification = Promise.resolve(true)
	}

	const notify = async (notification: string) => {
		if (document.hidden && (await authorizedNotification)) {
			new Notification(notification)
		}
	}

	const requestNotifications = () => {
		authorizedNotification = Notification.requestPermission().then((userAnswer) => userAnswer === 'granted')
		return authorizedNotification
	}

	return {
		notify,
		requestNotifications
	}
}

export default notificationApi()
