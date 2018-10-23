export const buildRepositoriesQuery = fragment => repositoryList => {
	const fragments = repositoryList.length > 0 ? `\n\n${fragment}\n\n${repositoryListFragment(repositoryList)}` : ``
	const query = repositoryList.length > 0 ? `\n\t...repositoryList` : ``
	return `${rateLimitFragment}${fragments}\n\nquery {\n\t...rateLimit${query}\n}`
}

const rateLimitFragment = `fragment rateLimit on Query {
	rateLimit {
		cost,
		limit,
		remaining,
		resetAt
	}
}`

const repositoryListFragment = repositoryList => {
	const temp = repositoryList
		.map(({owner, name}, index) => `\trep_${index}: repository(owner: "${owner}", name: "${name}") {...repository}`)
		.reduce((previous, current) => `${previous}\n${current}`)
	return `fragment repositoryList on Query {\n${temp}\n}`
}
