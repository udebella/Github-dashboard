export const NO_TOKEN = ``

export const buildSessionService = (sessionStorage) => {
	const setUser = token => {
		sessionStorage.setItem(`userToken`, token)
	}

	const getUser = () => sessionStorage.getItem(`userToken`) || NO_TOKEN

	return {
		setUser,
		getUser,
	}
}
