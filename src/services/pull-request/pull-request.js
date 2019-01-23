export const extractHttp = ({pullRequests}) => pullRequests.nodes
	.sort(({updatedAt: first}, {updatedAt: second}) => new Date(second).getTime() - new Date(first).getTime())
	.map(({title, url, createdAt, updatedAt, commits}) => ({
		prTitle: title,
		prUrl: url,
		creationDate: new Date(createdAt),
		updateDate: new Date(updatedAt),
		...extractStatuses(commits),
	}))

const extractStatuses = ({nodes}) => {
	const {committedDate, status} = nodes[0].commit
	const {state, contexts} = status || {state: 'NO_STATUS', contexts: []}
	return {
		committedDate,
		buildStatus: state,
		statuses: contexts.map(({context, state, targetUrl}) => ({
			description: context,
			jobStatus: state,
			jobUrl: targetUrl,
		})),
	}
}
