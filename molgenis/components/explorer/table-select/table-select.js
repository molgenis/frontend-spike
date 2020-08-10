export default {
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
}