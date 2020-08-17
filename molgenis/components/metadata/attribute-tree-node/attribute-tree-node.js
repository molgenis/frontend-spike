export default {
    computed: {
        isFolder: function() {
            return this.attribute.type === 'compound'
        },
    },
    props: {
        attribute: {
            required: true,
            type: Object,
        },
        onAttributeSelect: {
            required: false,
            type: Function,
        },
    },
}