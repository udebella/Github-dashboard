import {expect} from 'chai'
import {Store} from 'vuex'
import {localStoragePlugin} from './local-storage-plugin'

describe('Local storage store feature', () => {
	let store

	beforeEach(() => {
		store = new Store({
			state: {count: 1},
			mutations: {
				increment(state) {
					state.count++
				},
			},
		})
	})

	afterEach(() => {
		window.localStorage.clear()
	})

	it('should save mutation and reload them into a new store', () => {
		localStoragePlugin(store)

		store.commit('increment')
		const newStore = new Store({})
		localStoragePlugin(newStore)

		expect(newStore.state.count).to.equals(2)
	})
})
