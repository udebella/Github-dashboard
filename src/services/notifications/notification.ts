const notificationApi = ({ Notification = window.Notification, document = window.document } = {}) => {
	// eslint-disable-next-line
	let resolve: any
	const authorizedNotification = new Promise<boolean>((r) => {
		resolve = r
	})

	if (Notification.permission === 'denied') {
		resolve(false)
	} else if (Notification.permission === 'granted') {
		resolve(true)
	} else {
		Notification.requestPermission().then((userAnswer) => {
			if (userAnswer === 'granted') {
				resolve(true)
			} else {
				resolve(false)
			}
		})
	}

	const notify = async (notification: string) => {
		if (document.hidden && (await authorizedNotification)) {
			new Notification(notification)
		}
	}

	return {
		notify
	}
}

export { notificationApi }
