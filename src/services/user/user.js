const query = ``

export const buildUserService = graphqlClient => {
	const login = async token => {
		graphqlClient.setUser(token)
		try {
			return await performLogin(token)
		} catch ({response}) {
			return handleError(response)
		}
	}

	const performLogin = async token => {
		const {data} = await graphqlClient.request(query)
		return ({
			success: {
				login: data.viewer.login,
				token: token,
			},
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
	}
}
