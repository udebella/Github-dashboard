import notificationService from '../notifications/notification'

const defaults = { notificationApi: notificationService }
const pullRequestNotifications = ({ notificationApi } = defaults) => {
	let alreadyNotified = []

	const newList = (pullRequests) => {
		const prToNotify = pullRequests.filter(
			({ title }) => !alreadyNotified.find((notifiedPr) => notifiedPr.title === title)
		)
		alreadyNotified = [...alreadyNotified, ...prToNotify]
		const notificationMessage = formatNotificationMessage(prToNotify)
		if (prToNotify.length !== 0) {
			notificationApi.notify(notificationMessage)
		}
	}

	const formatNotificationMessage = (prToNotify) => {
		if (prToNotify.length === 1) {
			const [{ title }] = prToNotify
			return `A new pull request was opened: ${title}`
		} else {
			return `${prToNotify.length} new pull requests were opened`
		}
	}

	return {
		newList
	}
}

export { pullRequestNotifications }
