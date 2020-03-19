import {expect} from 'chai'
import {Store} from 'vuex'
import {localStoragePlugin} from './local-storage-plugin'

describe('Local storage store feature', () => {
	let store

	beforeEach(() => {
		store = new Store({
			state: {},
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
		localStoragePlugin({count: 1})(store)

		store.commit('increment')
		const newStore = new Store({})
		localStoragePlugin({count: 1})(newStore)

		expect(newStore.state.count).to.equals(2)
	})
})
