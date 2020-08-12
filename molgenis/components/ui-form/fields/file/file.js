import VueForm from 'vue-form'

export default {
    computed: {
        buttonText() {
            const key = this.localValue ? 'ui-form:form_file_change' : 'ui-form:form_file_browse'
            return this.$t ? this.$t(key) : key
        },
        label() {
            return typeof this.localValue === 'string' ? this.localValue
                : this.localValue instanceof Blob ? this.localValue.name : ''
        },
    },
    data() {
        return {
            // Store a local value to prevent changing the parent state
            localValue: this.value,
        }
    },
    methods: {
        clear() {
            this.fieldState.$touched = true
            this.fieldState.$untouched = false
            if (this.isRequired) {
                return
            }
            this.localValue = null
            this.$emit('input', this.localValue)
            this.fieldState.$dirty = true
            this.fieldState.$pristine = false
        },
        handleFileChange(e) {
            // Whenever the file changes, emit the 'input' event with the file data.
            this.localValue = e.target.files[0]
            this.$emit('input', this.localValue)

            this.fieldState.$dirty = true
            this.fieldState.$pristine = false
            this.fieldState.$touched = true
            this.fieldState.$untouched = false
        },
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
        isRequired: {
            default: false,
            type: Boolean,
        },
        isValid: {
            default: true,
            type: Boolean,
        },
        value: {
            required: false,
            type: [File, String],
        },
    },
    watch: {
        value(value) {
            this.localValue = value
        },
    },
}