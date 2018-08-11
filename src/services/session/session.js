export const NO_TOKEN = ``

const USER_KEY = `userToken`

export const buildSessionService = (storage = sessionStorage) => {
	const setUser = token => {
		storage.setItem(USER_KEY, token)
	}

	const getUser = () => storage.getItem(USER_KEY) || NO_TOKEN

	return {
		setUser,
		getUser,
	}
}
