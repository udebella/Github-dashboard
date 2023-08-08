type Notification = {
	new (message: string): {}
	permission: NotificationPermission
	requestPermission: () => Promise<NotificationPermission>
}

type Document = {
	hidden: boolean
}

export type Dependencies = {
	Notification?: Notification
	document?: Document
}

const notificationApi = ({ Notification = window.Notification, document = window.document }: Dependencies = {}) => {
	// eslint-disable-next-line
	let resolve: any
	const authorizedNotification = new Promise<boolean>((r) => {
		resolve = r
	})

	if (Notification.permission === 'denied') {
		resolve(false)
	} else if (Notification.permission === 'granted') {
		resolve(true)
	}

	const notify = async (notification: string) => {
		if (document.hidden && (await authorizedNotification)) {
			new Notification(notification)
		}
	}

	const requestNotifications = () =>
		Notification.requestPermission().then((userAnswer) => {
			if (userAnswer === 'granted') {
				resolve(true)
			} else {
				resolve(false)
			}
		})

	return {
		notify,
		requestNotifications
	}
}

export { notificationApi }
