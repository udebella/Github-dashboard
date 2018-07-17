export default {
    name: "build-status",
    props: {
        status: {
            type: Object,
            required: true,
        }
    },
    mounted() {
        console.log(this.status)
    }
}