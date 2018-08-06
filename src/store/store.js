import {Store} from 'vuex'
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const state = {
	watchedRepositories: {},
}

const addRepository = (store, {owner, name}) => {
	const watchedRepositories = {
		[owner]: [
			...store.watchedRepositories[owner] || [],
			name,
		],
	}
	store.watchedRepositories = {
		...store.watchedRepositories,
		...watchedRepositories,
	}
}

const removeRepository = ({watchedRepositories}, {owner, name}) => {
	watchedRepositories[owner] = watchedRepositories[owner]
		.filter(repository => repository !== name)
}

export const mutations = {
	addRepository,
	removeRepository,
}

export const store = new Store({
	state,
	mutations,
})
