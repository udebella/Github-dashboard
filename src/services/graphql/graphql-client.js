import { GraphQLClient } from 'graphql-request'
import { buildSessionService } from '../session/session'
import { useConfigurationStore } from '../../stores/configuration/configuration'

// TODO Is it possible to test that?
const defaultBuilder = (...args) => new GraphQLClient(...args)

export const buildRequest =
	({ builder = defaultBuilder, session = buildSessionService() }) =>
	(query) => {
		const user = session.getUser()
		if (user === 'NO_USER') {
			throw new Error('User is not connected')
		}
		const client = builder(useConfigurationStore().githubApi, {
			headers: { Authorization: `token ${user.token}` }
		})

		return client.request(query)
	}

export const request = buildRequest({ builder: defaultBuilder, session: buildSessionService() })
