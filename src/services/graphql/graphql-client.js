import {GraphQLClient} from 'graphql-request'
import {token} from './token.hidden.js' // TODO make a component that asks the use for a personal token as we cannot use github login in a frontend app (it would need a server)

/**
 * @deprecated
 */
const getClient = (graphQlClientBuilder, session) => {
	const client = graphQlClientBuilder(`/graphql`, {
		headers: {
			Authorization: `token ${session.getUser()}`,
		},
	})

	return {
		request: client.request,
	}
}

/**
 * @deprecated
 */
const defaultClient = new GraphQLClient(`/graphql`, {
	headers: {
		Authorization: `token ${token}`,
	},
})

export const request = async (query, {builder, session}) => {
	const client = getClient(builder, session)

	client.request(query)
}
