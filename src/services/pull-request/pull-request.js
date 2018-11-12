export const extractHttp = ({pullRequests}) => pullRequests.nodes
	.map(({title, url, createdAt, commits}) => ({
		prTitle: title,
		prUrl: url,
		creationDate: new Date(createdAt),
		...extractStatuses(commits),
	}))

const extractStatuses = ({nodes}) => {
	const status = nodes[0].commit.status
	return {
		buildStatus: status.state || `NO_STATUS`,
		statuses: status.contexts.map(({context, state, targetUrl}) => ({
			description: context,
			jobStatus: state,
			jobUrl: targetUrl,
		})),
	}
}
