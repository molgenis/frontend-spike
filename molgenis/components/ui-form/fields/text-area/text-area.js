import VueForm from 'vue-form'

let debounceTime = 500

export default {
    data() {
        return {
            // Store a local value to prevent changing the parent state
            localValue: this.value,
        }
    },
    mixins: [VueForm],
    props: {
        field: {
            required: true,
            // type: FormField,
        },
        fieldState: {
            required: false,
            type: Object,
        },
        inputDebounceTime: {
            default: debounceTime,
            type: Number,
        },
        isRequired: {
            default: false,
            type: Boolean,
        },
        isValid: {
            default: true,
            type: Boolean,
        },
        maxlength: {
            default: 65535,
            type: Number,
        },
        value: {
            required: false,
            type: String,
        },
    },
    watch: {
        localValue() {
            this.$emit('input', this.localValue)
        },
    },
}