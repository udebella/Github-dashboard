// TODO fix this to work with pinia instead
// const LOCAL_STORAGE_KEY = 'github-dashboard-store'
//
// export const localStoragePlugin = defaultState => (store, storage = window.localStorage) => {
// 	const stringifiedStore = storage.getItem(LOCAL_STORAGE_KEY) || '{}'
// 	const handler = (_, state) => {
// 		storage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
// 	}
//
// 	const localStorageStore = JSON.parse(stringifiedStore)
// 	store.replaceState({...defaultState, ...localStorageStore})
// 	handler('initialize', {...defaultState, ...localStorageStore})
//
// 	store.subscribe(handler)
// }
