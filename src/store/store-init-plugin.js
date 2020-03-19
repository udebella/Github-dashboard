const defaultStore = {
	githubApi: 'https://api.github.com/graphql',
	watchedRepositories: [],
	configurationEnabled: true,
	timeBetweenRefresh: 30,
}

export const storeInit = store => {
	store.replaceState({...defaultStore, ...store.state})
}
