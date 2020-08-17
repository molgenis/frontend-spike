export default {
    computed: {
        classObject() {
            const type = this.outline ? 'btn btn-outline-' + this.type : 'btn btn-' + this.type
            const size = this.size ? 'btn-' + this.size : ''
            return type + ' ' + size
        },
    },
    props: {
        disabled: {
            default: false,
            required: false,
            type: Boolean,
        },
        onClick: {
            required: false,
            type: Function,
        },
        outline: {
            default: false,
            required: false,
            type: Boolean,
        },
        size: {
            default: null,
            required: false,
            type: String,
            validator(size) {
                const availableSizes = ['sm', 'lg']
                return availableSizes.indexOf(size) > 0
            },
        },
        type: {
            default: 'success',
            required: false,
            type: String,
            validator(type) {
                const availableTypes = ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'link']
                return availableTypes.indexOf(type) > 0
            },
        },
    },
}