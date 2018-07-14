import {request} from "../../services/graphql-client";
import {query} from "./build-status.query";

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
            type: String,
            required: true,
        },
    },
    data() {
       return {
           state: '',
       }
    },
    mounted() {
        request(query({
            owner: this.owner,
            branch: this.branch,
            repository: this.name,
        }))
            .then(({repository}) => repository)
            .then(({ref}) => ref)
            .then(({target}) => target)
            .then(({status}) => status)
            .then(({state}) => this.state = state)
            .then(console.log)
    },
    name: 'build-status',
}