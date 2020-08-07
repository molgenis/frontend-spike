export default {
    methods: {
        href: (item) => item.params ? `${item.id}?${item.params}` : item.id,
    },
    name: 'drop-down-items',
    props: {
        depth: {
            default: 0,
            required: false,
            type: Number,
        },
        items: {
            required: true,
            type: Array,
        },
        parent: {
            required: true,
            type: Object,
        },
    },

}