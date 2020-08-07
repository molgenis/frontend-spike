export default {
    name: 'drop-down-items',
    props: {
        parent: {
            type: Object,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
        depth: {
            type: Number,
            required: false,
            default: 0,
        },
    },
    methods: {
        href: (item) => item.params ? `${item.id}?${item.params}` : item.id,
    },
}