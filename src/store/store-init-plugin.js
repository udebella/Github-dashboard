export const StoreInit = ({replaceState}) => {
	replaceState({
		githubApi: 'https://api.github.com/graphql',
		watchedRepositories: [],
		configurationEnabled: true,
		timeBetweenRefresh: 30,
	})
}
