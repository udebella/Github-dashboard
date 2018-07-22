import {request} from '../../services/graphql-client'
import {query} from './starred-repo.query'
import repositoryList from '../repository-list/repository-list.vue'

const extractRepositories = data => {
    const {viewer: {starredRepositories: {nodes}}} = data
    return nodes
        .map(({name, owner, url, defaultBranchRef}) => ({
            name,
            owner: owner.login,
            url,
            defaultBranch: defaultBranchRef.name,
        }))
}

export default {
    name: `starred-repos`,
    props: {
        username: {
            type: String,
            required: true,
        },
    },
    data: () => ({
        repositories: [],
    }),
    async mounted() {
        const response = await request(query)
        this.repositories = extractRepositories(response)
    },
    components: {
        repositoryList,
    },
}