export type Dependencies = {
	storage?: Storage
	store: Store
}

export type Storage = {
	getItem: (key: string) => string | null
	setItem: (key: string, value: string) => void
}

export type Store = {
	$id: string
	$patch: (state: object) => void
	$subscribe: (callback: Callback) => void
}
export type Callback = (_: unknown, state: object) => void

export const localStoragePlugin = ({ storage = localStorage, store }: Dependencies) => {
	const state = storage.getItem(`github-dashboard-store-${store.$id}`)
	if (state) {
		store.$patch(JSON.parse(state))
	}
	store.$subscribe((_, state) => {
		storage.setItem(`github-dashboard-store-${store.$id}`, JSON.stringify(state))
	})
}
