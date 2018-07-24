import {request} from '../../services/graphql-client'
import {query} from './starred-repo.query'
import debounce from 'debounce'
import listPicker from '../list-picker/list-picker.vue'

const retrieveData = async username => await request(query(username))

const extractRepositories = ({user}) => {
    const {repositories} = user || {}
    return [...repositories.nodes] || []
}

const extractStarredRepositories = ({user}) => {
    const {starredRepositories} = user || {}
    return [...starredRepositories.nodes] || []
}

const blabla = ({repositories, username, newRepos}) => ({
    ...repositories,
    [username]: {
        ...repositories[username],
        ...newRepos,
    },
})

export default {
    name: `settings`,
    data: () => ({
        username: ``,
        userRepositories: [],
        userStarredRepositories: [],
        watchedRepositories: {},
    }),
    watch: {
        username() {
            this.refreshUserRepositories()
        },
    },
    created() {
        const refreshUserRepositories = async () => {
            const response = await retrieveData(this.username)
            this.userStarredRepositories = extractStarredRepositories(response).map(({name}) => name)
            this.userRepositories = extractRepositories(response).map(({name}) => name)
        }

        this.refreshUserRepositories = debounce(refreshUserRepositories, 1000)
    },
    methods: {
        updateRepositories(array) {
            this.watchedRepositories = blabla({
                repositories: this.watchedRepositories,
                username: this.username,
                newRepos: {
                    repositories: array,
                },
            })
        },
        updateStarredRepositories(array) {
            this.watchedRepositories = blabla({
                repositories: this.watchedRepositories,
                username: this.username,
                newRepos: {
                    starredRepositories: array,
                },
            })
        },
    },
    components: {
        listPicker,
    },
}