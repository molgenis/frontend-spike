import Vue from 'vue'

export default Vue.extend({
    name: 'EndOfResults',
    props: {
        dataDisplayLimit: {
            required: true,
            type: Number,
        },
    },
})