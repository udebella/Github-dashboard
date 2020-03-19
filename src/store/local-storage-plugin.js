const LOCAL_STORAGE_KEY = 'github-dashboard-store'

export const localStoragePlugin = defaultState => (store, storage = window.localStorage) => {
	const stringifiedStore = storage.getItem(LOCAL_STORAGE_KEY)
	const handler = (_, state) => {
		storage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
	}

	if (stringifiedStore) {
		const localStorageStore = JSON.parse(stringifiedStore)
		store.replaceState(localStorageStore)
	} else {
		store.replaceState(defaultState)
		handler('initialize', defaultState)
	}

	store.subscribe(handler)
}
