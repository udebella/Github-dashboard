import {notificationApi} from '../notifications/notification'

const defaults = {notificationApi: notificationApi}
const pullRequestNotifications = ({notificationApi} = defaults) => {
	const newList = (pullRequests) => {
		if (pullRequests.length === 1) {
			notificationApi().notify(`A new pull request was opened: ${pullRequests[0].title}`)
		} else if (pullRequests.length > 1) {
			notificationApi().notify(`${pullRequests.length} new pull requests were opened`)
		}
	}

	return {
		newList,
	}
}

export {pullRequestNotifications}
