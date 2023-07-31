import { GraphQLClient } from 'graphql-request'
import { buildSessionService } from '../session/session'
import { useConfigurationStore } from '@/stores/configuration'

// TODO Is it possible to test that?
const defaultBuilder = (...args) => new GraphQLClient(...args)

export const request = async (
	query,
	{
		builder = defaultBuilder,
		session = buildSessionService(),
		store = useConfigurationStore()
	} = {}
) => {
	const { token } = session.getUser()
	const client = builder(store.githubApi, {
		headers: {
			Authorization: `token ${token}`
		}
	})

	return client.request(query)
}
