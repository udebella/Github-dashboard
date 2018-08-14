const LOCAL_STORAGE_KEY = `github-dashboard-store`

export default (store, storage = localStorage) => {
	const stringifiedStore = storage.getItem(LOCAL_STORAGE_KEY)
	if (stringifiedStore) {
		const localStorageStore = JSON.parse(stringifiedStore)
		store.replaceState(localStorageStore)
	}

	const handler = (_, state) => {
		storage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
	}

	store.subscribe(handler)
}
