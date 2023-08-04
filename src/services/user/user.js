import { buildSessionService } from '../session/session'
import { request as defaultRequest } from '../graphql/graphql-client'

// TODO find a way to test this
const query = `{ 
  viewer {
  	login,
  }
}`

export const buildUserService = ({ sessionBuilder = buildSessionService, request = defaultRequest } = {}) => {
	const { setUser, getUser, removeUser } = sessionBuilder()

	const login = async (token) => {
		setUser({ token })
		try {
			return await performLogin(token)
		} catch ({ response }) {
			return handleError(response)
		}
	}

	const connectedUser = getUser

	const performLogin = async (token) => {
		const response = await request(query)
		const loggedUser = {
			login: response.viewer.login,
			token: token
		}
		setUser(loggedUser)
		return {
			success: loggedUser
		}
	}

	const handleError = ({ message, status }) => {
		removeUser()
		return {
			error: {
				message,
				code: status
			}
		}
	}

	return {
		login,
		connectedUser
	}
}
