export const notificationApi = ({Notification}) => {
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
			}
		})
	}

	const notify = async () => {
		if (await authorizedNotification) {
			new Notification('Some notification')
		}
	}

	return {
		notify,
	}
}
