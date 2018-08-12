import {GraphQLClient} from 'graphql-request'
import {buildSessionService} from "../session/session"

// TODO Is it possible to test that?
const defaultBuilder = (...args) => new GraphQLClient(...args)

export const request = async (query, {builder = defaultBuilder, session = buildSessionService()} = {}) => {
	const {token} = session.getUser()
	const client = builder(`/graphql`, {
		headers: {
			Authorization: `token ${token}`,
		},
	})

	return client.request(query)
}
