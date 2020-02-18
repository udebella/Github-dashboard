import {notificationApi} from '../notifications/notification'

const defaults = {notificationApi: notificationApi}
const pullRequestNotifications = ({notificationApi} = defaults) => {
	const newList = ([{title} = {}] = []) => {
		if (title) {
			notificationApi().notify(`A new pull request was opened: ${title}`)
		}
	}

	return {
		newList,
	}
}

export {pullRequestNotifications}
