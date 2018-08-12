import {buildSessionService} from "../session/session"

// TODO find a way to test this
const query = `{ 
  viewer {
  	login,
  }
}`

export const buildUserService = ({sessionBuilder = buildSessionService, request} = {}) => {
	const {setUser, getUser} = sessionBuilder()

	const login = async token => {
		setUser({token})
		try {
			return await performLogin(token)
		} catch ({response}) {
			return handleError(response)
		}
	}

	const connectedUser = () => getUser()

	const performLogin = async token => {
		const {data} = await request(query)
		const loggedUser = {
			login: data.viewer.login,
			token: token,
		}
		setUser(loggedUser)
		return ({
			success: loggedUser,
		})
	}

	const handleError = ({message, status}) => {
		return ({
			error: {
				message,
				code: status,
			},
		})
	}

	return {
		login,
		connectedUser,
	}
}
