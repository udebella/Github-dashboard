import {GraphQLClient} from 'graphql-request'
import {buildSessionService} from '../session/session'
import {store as defaultStore} from '../../store/store'

// TODO Is it possible to test that?
const defaultBuilder = (...args) => new GraphQLClient(...args)

export const request = async (query, {builder = defaultBuilder, session = buildSessionService(), store = defaultStore} = {}) => {
	const {token} = session.getUser()
	const client = builder(store.state.githubApi, {
		headers: {
			Authorization: `token ${token}`,
		},
	})

	return client.request(query)
}
