import {expect} from 'chai'
import {stub} from 'sinon'
import LocalStorageStore from './local-storage-store'

describe(`Local storage store`, () => {
	let localStorageStore, fakeStore, fakeLocalStorage

	beforeEach(() => {
		fakeStore = {
			replaceState: stub(),
		}
		fakeLocalStorage = {
			getItem: stub(),
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
			fakeLocalStorage.getItem.returns(`this is the store`)

			localStorageStore(fakeStore, fakeLocalStorage)

			expect(fakeStore.replaceState).to.have.been.calledWith(`this is the store`)
		})

		it(`should not replace the state when there is no value in the local storage`, () => {
			fakeLocalStorage.getItem.returns(null)

			localStorageStore(fakeStore, fakeLocalStorage)

			expect(fakeStore.replaceState).not.to.have.been.called
		})
	})
})
