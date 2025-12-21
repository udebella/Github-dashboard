import { GraphQLClient } from 'graphql-request'
import { buildSessionService } from '../session/session'
import { useConfigurationStore } from '../../stores/configuration/configuration'
import type { RequestConfig } from 'node_modules/graphql-request/build/legacy/helpers/types'

const defaultBuilder = (url: string, options: RequestConfig) => new GraphQLClient(url, options)

type GraphqlClient = { request: <Result extends object>(query: string) => Promise<Result> }
export type Dependencies = {
	builder: (url: string, options: RequestConfig) => GraphqlClient
	session: Pick<ReturnType<typeof buildSessionService>, 'getUser'>
}

export const buildRequest =
	({ builder = defaultBuilder, session = buildSessionService() }: Dependencies) =>
	<Result extends object>(query: string) => {
		const user = session.getUser()
		if (user === 'NO_USER') {
			throw new Error('User is not connected')
		}
		const client = builder(useConfigurationStore().githubApi, {
			headers: { Authorization: `token ${user.token}` }
		})

		return client.request<Result>(query)
	}

export const request = buildRequest({ builder: defaultBuilder, session: buildSessionService() })
