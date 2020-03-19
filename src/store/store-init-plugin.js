const defaultStore = {
	githubApi: 'https://api.github.com/graphql',
	watchedRepositories: [],
	configurationEnabled: true,
	timeBetweenRefresh: 30,
}

export const StoreInit = ({state, replaceState}) => {
	replaceState({...defaultStore, ...state})
}
