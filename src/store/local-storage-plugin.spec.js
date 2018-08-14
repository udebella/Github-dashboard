import {expect} from 'chai'
import {stub} from 'sinon'
import LocalStorageStore from './local-storage-plugin'

describe(`Local storage store`, () => {
	let localStorageStore, fakeStore, fakeLocalStorage

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
		localStorageStore = LocalStorageStore
	})

	describe(`Initialization`, () => {
		it(`should be a function to give to vuex`, () => {
			expect(localStorageStore).to.be.a(`function`)
		})
	})

	describe(`Load store from local storage`, () => {
		it(`should retrieve store from local storage`, () => {
			localStorageStore(fakeStore, fakeLocalStorage)

			expect(fakeLocalStorage.getItem).to.have.been.calledWith(`github-dashboard-store`)
		})

		it(`should replace the state with retrieved value from local storage`, () => {
			fakeLocalStorage.getItem.returns(`{"state": "this is the store"}`)

			localStorageStore(fakeStore, fakeLocalStorage)

			expect(fakeStore.replaceState).to.have.been.calledWith({state: `this is the store`})
		})

		it(`should not replace the state when there is no value in the local storage`, () => {
			fakeLocalStorage.getItem.returns(null)

			localStorageStore(fakeStore, fakeLocalStorage)

			expect(fakeStore.replaceState).not.to.have.been.called
		})
	})

	describe(`Save store to local storage after every mutation`, () => {
		it(`should subscribe to store mutations`, () => {
			localStorageStore(fakeStore, fakeLocalStorage)

			expect(fakeStore.subscribe).to.have.been.called
		})

		it(`should put store in local storage after subscription`, () => {
			localStorageStore(fakeStore, fakeLocalStorage)
			fakeStore.mutate(`mutation`, {state: `this is the new store`})

			expect(fakeLocalStorage.setItem).to.have.been.calledWith(`github-dashboard-store`, `{"state":"this is the new store"}`)
		})
	})
})
