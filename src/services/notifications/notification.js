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
		console.log(authorizedNotification) // eslint-disable-line
		new Notification('Some notification')
	}

	return {
		notify,
	}
}
