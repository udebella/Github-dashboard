const query = ``

export const buildUserService = graphqlClient => {
	const login = async token => {
		try {
			const {data} = await graphqlClient.request(query)
			return ({
				success: {
					login: data.viewer.login,
					token: token,
				},
			})
		} catch ({response}) {
			const {message, status} = response
			return ({
				error: {
					message,
					code: status,
				},
			})
		}

	}

	return {
		login,
	}
}
