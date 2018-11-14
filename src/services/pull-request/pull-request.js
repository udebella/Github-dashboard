export const extractHttp = ({pullRequests}) => pullRequests.nodes
	.sort(({updatedAt: first}, {updatedAt: second}) => new Date(second).getTime() - new Date(first).getTime())
	.map(({title, url, createdAt, commits}) => ({
		prTitle: title,
		prUrl: url,
		creationDate: new Date(createdAt),
		...extractStatuses(commits),
	}))

const extractStatuses = ({nodes}) => {
	const {state, contexts} = nodes[0].commit.status || {state: `NO_STATUS`, contexts: []}
	return {
		buildStatus: state,
		statuses: contexts.map(({context, state, targetUrl}) => ({
			description: context,
			jobStatus: state,
			jobUrl: targetUrl,
		})),
	}
}
