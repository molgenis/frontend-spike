export default {
    name: 'ToastComponent',
    props: {
        message: {
            required: true,
            type: String,
        },
        type: {
            required: true,
            type: String,
        },
    },
}