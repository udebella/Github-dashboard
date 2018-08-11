export const buildSessionService = (sessionStorage) => {
	const setUser = token => {
		sessionStorage.setItem(`userToken`, token)
	}

	return {
		setUser,
	}
}
