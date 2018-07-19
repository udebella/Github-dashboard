import {GraphQLClient} from 'graphql-request'
import {token} from './token.hidden.js' // FIXME use authorized app from github instead : https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow

const client = new GraphQLClient('/graphql', {
    headers: {
        Authorization: `token ${token}`,
    },
})

export const request = async query => client.request(query)