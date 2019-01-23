export const extractHttp = repositoryList => repositoryList
	.flatMap(({pullRequests}) => pullRequests.nodes
		.map(({title, url, createdAt, updatedAt, commits}) => ({
			prTitle: title,
			prUrl: url,
			creationDate: new Date(createdAt),
			updateDate: new Date(updatedAt),
			...extractStatuses(commits),
		})))
	.sort(({updateDate: first}, {updateDate: second}) => new Date(second).getTime() - new Date(first).getTime())

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
