export const extractHttp = ({pullRequests}) => pullRequests.nodes
	.map(({title, url, createdAt}) => ({
		prTitle: title,
		prUrl: url,
		statuses: [],
		buildStatus: `NO_STATUS`,
		creationDate: new Date(createdAt),
	}))
