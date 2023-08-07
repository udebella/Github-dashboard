import type { PiniaPluginContext } from 'pinia'

type Storage = {
	getItem: (key: string) => string | null
	setItem: (key: string, value: string) => void
}

type Dependencies = {
	storage?: Storage
} & PiniaPluginContext

export const localStoragePlugin = ({ storage = localStorage, store }: Dependencies) => {
	const state = storage.getItem(`github-dashboard-store-${store.$id}`)
	if (state) {
		store.$patch(JSON.parse(state))
	}
	store.$subscribe((_, state) => {
		storage.setItem(`github-dashboard-store-${store.$id}`, JSON.stringify(state))
	})
}
