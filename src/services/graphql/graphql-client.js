import { GraphQLClient } from 'graphql-request'
import { buildSessionService } from '../session/session'
import { useConfigurationStore } from '../../stores/configuration/configuration'

// TODO Is it possible to test that?
const defaultBuilder = (...args) => new GraphQLClient(...args)

export const buildRequest =
	({ builder = defaultBuilder, session = buildSessionService() }) =>
	(query) => {
		const { token } = session.getUser()
		const client = builder(useConfigurationStore().githubApi, {
			headers: { Authorization: `token ${token}` }
		})

		return client.request(query)
	}

export const request = buildRequest({ builder: defaultBuilder, session: buildSessionService() })
