export const extractHttp = ({pullRequests}) => pullRequests.nodes
	.map(({title, url, createdAt, commits}) => Object.assign({}, {
		prTitle: title,
		prUrl: url,
		creationDate: new Date(createdAt),
	}, extractStatuses(commits)))

const extractStatuses = ({nodes}) => ({
	buildStatus: nodes[0].commit.status.state || `NO_STATUS`,
	statuses: nodes[0].commit.status.contexts.map(({context, state, targetUrl}) => ({
		description: context,
		jobStatus: state,
		jobUrl: targetUrl,
	})),
})
