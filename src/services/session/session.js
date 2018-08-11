export const NO_TOKEN = ``

const USER_KEY = `userToken`

export const buildSessionService = (sessionStorage) => {
	const setUser = token => {
		sessionStorage.setItem(USER_KEY, token)
	}

	const getUser = () => sessionStorage.getItem(USER_KEY) || NO_TOKEN

	return {
		setUser,
		getUser,
	}
}
