const notificationApi = ({Notification = window.Notification, document = window.document} = {}) => {
	let resolve
	let authorizedNotification = new Promise(r => {resolve = r})

	if (Notification.permission === 'denied') {
		resolve(false)
	} else if (Notification.permission === 'granted') {
		resolve(true)
	} else {
		Notification.requestPermission().then(userAnswer => {
			if (userAnswer === 'granted') {
				resolve(true)
			} else {
				resolve(false)
			}
		})
	}

	const notify = async (notification) => {
		if (document.hidden && await authorizedNotification) {
			new Notification(notification)
		}
	}

	return {
		notify,
	}
}

export {notificationApi}
