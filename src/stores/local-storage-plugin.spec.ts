import type { Callback, Storage, Store } from './local-storage-plugin'
import { localStoragePlugin } from './local-storage-plugin'
import { beforeEach, describe, expect, it, vitest } from 'vitest'
import type { Mocks } from '../test-utils'

type MockStore = {
	mutate: Callback
} & Mocks<Store>

describe('Local storage store', () => {
	let fakeStore: MockStore
	let fakeLocalStorage: Mocks<Storage>

	beforeEach(() => {
		fakeStore = {
			$id: 'test',
			$patch: vitest.fn(),
			$subscribe: vitest.fn((callback) => {
				fakeStore.mutate = callback
			}),
			mutate: vitest.fn()
		}
		fakeLocalStorage = {
			getItem: vitest.fn(),
			setItem: vitest.fn()
		}
	})

	describe('Load store from local storage', () => {
		it('should retrieve store from local storage', () => {
			localStoragePlugin({ store: fakeStore, storage: fakeLocalStorage })

			expect(fakeLocalStorage.getItem).toHaveBeenCalledWith('github-dashboard-store-test')
		})

		it('should replace the state with retrieved value from local storage', () => {
			fakeLocalStorage.getItem.mockReturnValue('{"state": "this is the store"}')

			localStoragePlugin({ store: fakeStore, storage: fakeLocalStorage })

			expect(fakeStore.$patch).toHaveBeenCalledWith({ state: 'this is the store' })
		})

		it('should patch store if there is no value', () => {
			fakeLocalStorage.getItem.mockReturnValue(null)

			localStoragePlugin({ store: fakeStore, storage: fakeLocalStorage })

			expect(fakeStore.$patch).not.toHaveBeenCalled()
		})
	})

	describe('Save store to local storage after every mutation', () => {
		it('should subscribe to store mutations', () => {
			localStoragePlugin({ store: fakeStore, storage: fakeLocalStorage })

			expect(fakeStore.$subscribe).toHaveBeenCalled()
		})

		it('should put store in local storage after subscription', () => {
			localStoragePlugin({ store: fakeStore, storage: fakeLocalStorage })
			fakeStore.mutate(undefined, {
				state: 'this is the new store'
			})

			expect(fakeLocalStorage.setItem).toHaveBeenCalledWith(
				'github-dashboard-store-test',
				'{"state":"this is the new store"}'
			)
		})
	})
})
