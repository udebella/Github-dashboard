import {request} from '../../services/graphql-client'
import {query} from './starred-repo.query'
import debounce from 'debounce'

const retrieveData = async username => await request(query(username))

const extractRepositories = ({user}) => {
    const {repositories} = user || {}
    return [...repositories.nodes] || []
}

const extractStarredRepositories = ({user}) => {
    const {starredRepositories} = user || {}
    return [...starredRepositories.nodes] || []
}

export default {
    name: `settings`,
    data: () => ({
        username: ``,
        userRepositories: [],
        userStarredRepositories: [],
    }),
    watch: {
        username() {
            this.refreshUserRepositories()
        },
    },
    created() {
        const refreshUserRepositories = async () => {
            const response = await retrieveData(this.username)
            this.userStarredRepositories = extractStarredRepositories(response)
            this.userRepositories = extractRepositories(response)
        }

        this.refreshUserRepositories = debounce(refreshUserRepositories, 1000)
    },
}