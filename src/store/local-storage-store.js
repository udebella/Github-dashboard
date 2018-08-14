const LOCAL_STORAGE_KEY = `github-dashboard-store`

export default (store, storage) => {
	const localStorageStore = storage.getItem(LOCAL_STORAGE_KEY)
	if (localStorageStore) {
		store.replaceState(localStorageStore)
	}
}
