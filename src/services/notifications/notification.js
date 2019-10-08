export const notificationApi = ({Notification}) => {
	let authorizedNotification = false

	if (Notification.permission === 'granted') {
		authorizedNotification = true
	} else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function (permission) {
			if (permission === 'granted') {
				authorizedNotification = true
			}
		})
	}

	const notify = () => {
		if (authorizedNotification) {
			new Notification('Some notification')
		}
	}

	return {
		notify,
	}
}
