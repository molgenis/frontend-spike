export default {
    name: 'TableHeader',
    props: {
        isShop: {
            default: () => false,
            required: false,
            type: Boolean,
        },
        visibleColumns: {
            required: true,
            type: Array,
        },
    },
}