const mostRecentFirst = ({updateDate: first}, {updateDate: second}) => second.getTime() - first.getTime()

export const extractHttp = repositoryList => repositoryList
	.flatMap(({pullRequests}) => pullRequests.nodes
		.map(({title, url, createdAt, updatedAt, commits, reviews}) => ({
			prTitle: title,
			prUrl: url,
			creationDate: new Date(createdAt),
			updateDate: new Date(updatedAt),
			...extractReviews(reviews),
			...extractStatuses(commits),
		})))
	.sort(mostRecentFirst)

const extractReviews = ({nodes}) => nodes.length ? {reviewDate: new Date(nodes[0].submittedAt)} : {}

const extractStatuses = ({nodes}) => {
	const {committedDate, status} = nodes[0].commit
	const {state, contexts} = status || {state: 'NO_STATUS', contexts: []}
	return {
		commitDate: new Date(committedDate),
		buildStatus: state,
		statuses: contexts.map(({context, state, targetUrl}) => ({
			description: context,
			jobStatus: state,
			jobUrl: targetUrl,
		})),
	}
}