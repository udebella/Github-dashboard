type NO_USER = typeof NO_USER
export const NO_USER = {}

type USER_KEY = typeof USER_KEY
const USER_KEY = 'user'

type Storage = {
	setItem: (key: string, item: string) => void
	getItem: (key: string) => string | null
	removeItem: (key: string) => void
}

type User = {
	login: string
	token: string
}

export const buildSessionService = (storage: Storage = window.sessionStorage) => {
	const setUser = (item: User) => {
		storage.setItem(USER_KEY, JSON.stringify(item))
	}

	const getUser = (): User | NO_USER => JSON.parse(storage.getItem(USER_KEY)) || NO_USER

	const removeUser = () => storage.removeItem(USER_KEY)

	return {
		setUser,
		getUser,
		removeUser
	}
}
