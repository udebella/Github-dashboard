import {request} from "../../services/graphql-client"
import {query} from "./starred-repo.query"
import repositoryList from '../repository-list/repository-list.vue'

export default {
    name: 'starred-repos',
    props: {
        username: {
            type: String,
            required: true,
        },
    },
    data: () => ({
        repositories: [],
    }),
    mounted() {
        request(query)
            .then(({viewer}) => viewer)
            .then(({starredRepositories}) => starredRepositories)
            .then(({nodes}) => this.repositories = nodes
                .map(({name, owner, url, defaultBranchRef}) => ({
                    name,
                    owner: owner.login,
                    url,
                    defaultBranch: defaultBranchRef.name,
                })))
    },
    components: {
        repositoryList,
    },
}