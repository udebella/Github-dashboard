export const NO_USER = {}

const USER_KEY = `user`

export const buildSessionService = (storage = sessionStorage) => {
	const setUser = item => {
		storage.setItem(USER_KEY, JSON.stringify(item))
	}

	const getUser = () => JSON.parse(storage.getItem(USER_KEY)) || NO_USER

	return {
		setUser,
		getUser,
	}
}
