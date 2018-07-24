export default {
    name: `item-picker`,
    props: {
        item: {
            required: true,
            type: String,
        },
    },
    data: () => ({
        isChecked: false,
    }),
    methods: {
        notifyParent({value, checked}) {
            const eventToSend = checked ? `tick` : `untick`
            this.$emit(eventToSend, value)
        },
    },
}