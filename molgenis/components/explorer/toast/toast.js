import Vue from 'vue'

export default Vue.extend({
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
})