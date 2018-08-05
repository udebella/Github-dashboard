const addRepository = ({watchedRepositories}, {owner, name}) => {
	if (!watchedRepositories[owner]) {
		watchedRepositories[owner] = []
	}
	watchedRepositories[owner] = [
		...watchedRepositories[owner],
		name,
	]
}

const removeRepository = ({watchedRepositories}, {owner, name}) => {
	watchedRepositories[owner] = watchedRepositories[owner]
		.filter(repository => repository !== name)
}

export const mutations = {
	addRepository,
	removeRepository,
}
