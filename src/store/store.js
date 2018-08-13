import Vuex, {Store} from 'vuex'
import Vue from "vue"

Vue.use(Vuex)

const state = {
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

const differentFrom = first => second => {
	return first.name !== second.name ||
		first.owner !== second.owner
}

export const mutations = {
	addRepository,
	removeRepository,
}

export const store = new Store({
	state,
	mutations,
})
