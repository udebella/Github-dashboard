const LOCAL_STORAGE_KEY = `github-dashboard-store`

export default (store, storage) => {
	const stringifiedStore = storage.getItem(LOCAL_STORAGE_KEY)
	if (stringifiedStore) {
		console.log(stringifiedStore); // eslint-disable-line
		const localStorageStore = JSON.parse(stringifiedStore)
		store.replaceState(localStorageStore)
	}
}
