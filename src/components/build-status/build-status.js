import axios from 'axios'

export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        branch: {
            type: String,
            required: true,
        },
        owner: {
            type: Object,
            required: true,
        },
    },
    data() {
       return {
           state: '',
       }
    },
    mounted() {
        // console.log('url :', `/repos/${this.owner.login}/${this.name}/branches/${this.branch}`)
        axios.get(`/repos/${this.owner.login}/${this.name}/branches/${this.branch}`)
            .then(({data}) => data)
            .then(({commit}) => commit)
            .then(({sha}) => sha)
            .then(sha => axios.get(`/repos/${this.owner.login}/${this.name}/commits/${sha}/status`))
            .then(({data}) => data)
            // .then(console.log)
            .then(({state}) => this.state = state)
            .catch(console.error)
    },
    name: 'build-status',
}