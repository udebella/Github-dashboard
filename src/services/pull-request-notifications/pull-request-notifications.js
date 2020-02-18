import {notificationApi} from '../notifications/notification'

const defaults = {notificationApi: notificationApi}
const pullRequestNotifications = ({notificationApi} = defaults) => {
	let alreadyNotified = []
	const notificationService = notificationApi()

	const newList = pullRequests => {
		const prToNotify = pullRequests
			.filter(({title}) => !alreadyNotified.find(notifiedPr => notifiedPr.title === title))
		alreadyNotified = [...prToNotify]
		if (prToNotify.length === 1) {
			notificationService.notify(`A new pull request was opened: ${prToNotify[0].title}`)
		} else if (prToNotify.length > 1) {
			notificationService.notify(`${prToNotify.length} new pull requests were opened`)
		}
	}

	return {
		newList,
	}
}

export {pullRequestNotifications}
