import isCompoundVisible from '/molgenis/lib/helpers/ui-form/is-compound-visible.js'
const defaultNoOptionsMessage = 'No options found for given search term.'

export default {
    computed: {
        fieldState() {
            return this.formState[this.field.id]
        },
        isRequired() {
            return this.field.required(this.formData)
        },
        isValid() {
            return this.field.validate(this.formData)
        },
        isVisible() {
            if (this.field.type === 'field-group') {
                return isCompoundVisible(this.field, this.formData)
            }
            return (this.showOptionalFields || this.isRequired) && this.field.visible(this.formData)
        },
        noOptionsMessage() {
            const msgKey = 'form_no_options'
            const namespace = 'ui-form'

            if (this.$t) {
                const i18nMessage = this.$t(namespace + ':' + msgKey)
                if (i18nMessage !== msgKey) {
                    return i18nMessage
                }
            }

            return defaultNoOptionsMessage
        },
        pending() {
            return this.fieldState && this.fieldState.$pending
        },
    },
    methods: {
        isUnique(value) {
            if (this.field.hasOwnProperty('unique')) {
                return this.field.unique(value, this.formData)
            }

            return true
        },
        onDataChange() {
            this.$emit('dataChange')
        },
    },
    props: {
        eventBus: {
            required: true,
            type: Object,
        },
        field: {
            required: true,
            // type: FormField,
        },
        formComponentOptions: {
            default: () => {
                return {
                    inputDebounceTime: 500,
                }
            },
            required: false,
            // type: FormComponentOptions,

        },
        formData: {
            required: true,
            type: Object,
        },

        formState: {
            required: true,
            type: Object,
        },
        level: {
            default: 0,
            required: false,
            type: Number,
        },
        showOptionalFields: {
            required: true,
            type: Boolean,
        },
    },
    watch: {
        pending(isPending) {
            if (!isPending) {
                // validation finished
                this.onDataChange()
            }
        },
    },
}