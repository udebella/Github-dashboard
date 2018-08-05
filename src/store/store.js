const addRepositories = (state, username, repositoryList) => {
	if (!state[username]) {
		state[username] = {repositories: []}
	}
	state[username] = {
		repositories: [...state.username.repositories, ...repositoryList],
	}
}

const removeRepositories = (state, username, repositoryList) => {
	state[username] = {
		repositories: state.username.repositories
			.filter(repository => !repositoryList.includes(repository)),
	}
}

export const mutations = {
	addRepositories,
	removeRepositories,
}
