import {expect} from 'chai'
import {stub} from 'sinon'
import {localStoragePlugin} from './local-storage-plugin'

describe('Local storage store', () => {
	let fakeStore, fakeLocalStorage

	beforeEach(() => {
		fakeStore = {
			mutate: null,
			replaceState: stub(),
			subscribe: stub().callsFake(fn => fakeStore.mutate = fn),
		}
		fakeLocalStorage = {
			getItem: stub(),
			setItem: stub(),
		}
	})

	describe('Initialization', () => {
		it('should be a function to give to vuex', () => {
			expect(localStoragePlugin()).to.be.a('function')
		})
	})

	describe('Load store from local storage', () => {
		it('should retrieve store from local storage', () => {
			localStoragePlugin()(fakeStore, fakeLocalStorage)

			expect(fakeLocalStorage.getItem).to.have.been.calledWith('github-dashboard-store')
		})

		it('should replace the state with retrieved value from local storage', () => {
			fakeLocalStorage.getItem.returns('{"state": "this is the store"}')

			localStoragePlugin()(fakeStore, fakeLocalStorage)

			expect(fakeStore.replaceState).to.have.been.calledWith({state: 'this is the store'})
		})

		it('should persist the default store if there is no value', () => {
			fakeLocalStorage.getItem.returns(null)

			localStoragePlugin({someValue: 3})(fakeStore, fakeLocalStorage)

			expect(fakeStore.replaceState).to.have.been.calledWith({someValue: 3})
			expect(fakeLocalStorage.setItem).to.have.been.calledWith('github-dashboard-store', '{"someValue":3}')
		})
	})

	describe('Save store to local storage after every mutation', () => {
		it('should subscribe to store mutations', () => {
			localStoragePlugin()(fakeStore, fakeLocalStorage)

			expect(fakeStore.subscribe).to.have.been.called
		})

		it('should put store in local storage after subscription', () => {
			localStoragePlugin()(fakeStore, fakeLocalStorage)
			fakeStore.mutate('mutation', {state: 'this is the new store'})

			expect(fakeLocalStorage.setItem).to.have.been.calledWith('github-dashboard-store', '{"state":"this is the new store"}')
		})
	})
})
