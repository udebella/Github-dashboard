import Vuex, {Store} from 'vuex'
import Vue from "vue"
import localStoragePlugin from './local-storage-plugin'

Vue.use(Vuex)

const state = {
	githubApi: `https://api.github.com/graphql`,
	watchedRepositories: [],
}

const addRepository = (store, repository) => {
	store.watchedRepositories = [
		...store.watchedRepositories,
		repository,
	]
}

const removeRepository = (store, repository) => {
	store.watchedRepositories = [
		...store.watchedRepositories
			.filter(differentFrom(repository)),
	]
}

const updateGithubApi = (store, url) => {
	store.githubApi = `${url}/graphql`
}

const differentFrom = first => second => {
	return first.name !== second.name ||
		first.owner !== second.owner
}

export const mutations = {
	addRepository,
	removeRepository,
	updateGithubApi,
}

export const store = new Store({
	state,
	mutations,
	plugins: [localStoragePlugin],
})
