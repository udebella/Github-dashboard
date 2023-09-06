type NO_USER = typeof NO_USER
export const NO_USER = {}

const USER_KEY = 'user'

export type Storage = {
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

	const getUser = (): User | NO_USER => {
		const user = storage.getItem(USER_KEY)
		if (user === null) {
			return NO_USER
		}
		return JSON.parse(user)
	}

	const removeUser = () => storage.removeItem(USER_KEY)

	return {
		setUser,
		getUser,
		removeUser
	}
}
