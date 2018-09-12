export const NO_USER = {}

const USER_KEY = `user`

export const buildSessionService = (storage = window.sessionStorage) => {
	const setUser = item => {
		storage.setItem(USER_KEY, JSON.stringify(item))
	}

	const getUser = () => JSON.parse(storage.getItem(USER_KEY)) || NO_USER

	const removeUser = () => storage.removeItem(USER_KEY)

	return {
		setUser,
		getUser,
		removeUser,
	}
}
