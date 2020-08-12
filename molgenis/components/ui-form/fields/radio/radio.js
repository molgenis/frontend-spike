import VueForm from 'vue-form'


export default {
    computed: {
        nullOptionLabel() {
            return this.$t ? this.$t('ui-form:form_boolean_missing') : 'form_boolean_missing'
        },
    },
    created() {
        this.field.options().then(response => {
            this.options = response
        })
    },
    data() {
        return {
            // Store a local value to prevent changing the parent state
            localValue: this.value,
            options: [],
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
        isRequired: {
            default: false,
            type: Boolean,
        },
        isUnique: {
            default: () => true,
            type: Function,
        },
        isValid: {
            default: true,
            type: Boolean,
        },
        value: {
            // ID of select field can be of type: Integer, Long, String etc.
            required: false,
            type: [String, Number, Boolean],
        },
    },
    watch: {
        localValue() {
            this.$emit('input', this.localValue)
            // Fixes #254. For some reason the vue form does not pick up mouse clicks in some browsers.
            this.fieldState.$dirty = true
            this.fieldState.$pristine = false
            this.fieldState.$touched = true
            this.fieldState.$untouched = false
        },
    },
}