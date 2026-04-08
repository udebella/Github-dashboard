import { GraphQLClient } from 'graphql-request'
import { buildSessionService } from '../session/session'
import { useConfigurationStore } from '../../stores/configuration/configuration'

type GraphqlClient = { request: <Result extends object>(query: string) => Promise<Result> }
type RequestConfig = { headers: { Authorization: `token ${string}` } }
export type Dependencies = {
	builder: (url: string, options: RequestConfig) => GraphqlClient
	session: Pick<ReturnType<typeof buildSessionService>, 'getUser'>
}

const defaultDependencies = {
	builder: (url: string, options: RequestConfig) => new GraphQLClient(url, options),
	session: buildSessionService()
}
export const buildRequest =
	<Result extends object>({ builder, session }: Dependencies = defaultDependencies) =>
	(query: string) => {
		const user = session.getUser()
		if (user === 'NO_USER') {
			throw new Error('User is not connected')
		}
		const client = builder(useConfigurationStore().githubApi, {
			headers: { Authorization: `token ${user.token}` }
		})

		return client.request<Result>(query)
	}
