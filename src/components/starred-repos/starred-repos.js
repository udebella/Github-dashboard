import axios from 'axios'

export default {
    props: {
        username: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            repositories: []
        }
    },
    mounted() {
        axios.get(`/users/${this.username}/starred`)
            .then(({data}) => data)
            .then(repositories => this.repositories = repositories.map(({name, default_branch}) => ({name, default_branch})))
            .catch(console.error)
    },
    name: 'starred-repos'
}