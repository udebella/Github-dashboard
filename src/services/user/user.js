import {buildSessionService} from "../session/session"

// TODO find a way to test this
const query = `{ 
  viewer {
  	login,
  }
}`

export const buildUserService = ({sessionBuilder = buildSessionService, request} = {}) => {
	const {setUser} = sessionBuilder()

	let user = {}

	const login = async token => {
		setUser(token)
		try {
			return await performLogin(token)
		} catch ({response}) {
			return handleError(response)
		}
	}

	const connectedUser = () => user

	const performLogin = async token => {
		const {data} = await request(query)
		user = {
			login: data.viewer.login,
			token: token,
		}
		return ({
			success: user,
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
