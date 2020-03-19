import Vuex, {Store} from 'vuex'
import Vue from 'vue'
import {localStoragePlugin} from './local-storage-plugin'
import {storeInit} from './store-init-plugin'

Vue.use(Vuex)

const addRepository = (store, repository) => {
	store.watchedRepositories = [
		...store.watchedRepositories,
		repository,
	]
		.sort(({name: first}, {name: second}) => first.localeCompare(second))
}

const removeRepository = (store, repository) => {
	store.watchedRepositories = [
		...store.watchedRepositories
			.filter(differentFrom(repository)),
	]
}

const updateGithubApi = (store, url) => {
	store.githubApi = url
}

const toggleConfiguration = (store) => {
	store.configurationEnabled = !store.configurationEnabled
}

const differentFrom = first => second => {
	return first.name !== second.name ||
		first.owner !== second.owner
}

export const mutations = {
	addRepository,
	removeRepository,
	updateGithubApi,
	toggleConfiguration,
}

export const store = new Store({
	state: {},
	mutations,
	plugins: [localStoragePlugin, storeInit],
})
