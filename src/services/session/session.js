export const buildSessionService = (sessionStorage) => {
	const setUser = token => {
		sessionStorage.setItem(`userToken`, token)
	}

	const getUser = () => sessionStorage.getItem(`userToken`)

	return {
		setUser,
		getUser,
	}
}
