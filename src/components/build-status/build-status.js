export default {
    name: "build-status",
    props: {
        description: {
            type: String,
            required: true,
        },
        url: {
            required: true,
            type: String,
        },
        state: {
            required: true,
            type: String,
        },
    },
}