import Vue from 'vue'

export default Vue.extend({
    name: 'TableSelect',
    props: {
        label: {
            required: true,
            type: String,
        },
        packageTables: {
            required: true,
            type: Array,
        },
    },
})