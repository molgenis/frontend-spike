import VRuntimeTemplate from 'v-runtime-template'

export default {
    components: { VRuntimeTemplate },
    computed: {
        template: function() {
            return '<div>' + this.customCode.trim() + '</div>'
        },
    },
    name: 'CustomCardContent',
    props: {
        customCode: {
            required: true,
            type: String,
        },
        id: {
            required: true,
            type: String,
        },
        record: {
            required: true,
            type: Object,
        },
    },
}