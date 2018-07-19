import repositoryLine from "../repository-line/repository-line.vue"

export default {
    name: "repository-list",
    props: {
        repositories: {
            required: true,
            type: Array
        }
    },
    components: {
        repositoryLine
    }
}