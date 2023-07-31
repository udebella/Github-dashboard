export const localStoragePlugin = ({ store, storage = localStorage }) => {
	const state = storage.getItem(`github-dashboard-store-${store.$id}`)
	if (state) {
		store.$patch(JSON.parse(state))
	}
	store.$subscribe((state) => {
		storage.setItem(`github-dashboard-store-${store.$id}`, JSON.stringify(state.events.target))
	})
}
