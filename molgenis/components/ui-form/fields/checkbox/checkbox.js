import VueForm from 'vue-form'


export default {
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
    methods: {
        deSelectAll() {
            this.localValue = []
            this.fieldState.$touched = true
        },
        selectAll() {
            this.localValue = this.options.map(option => option.id)
            this.fieldState.$touched = true
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
            default: () => [],
            required: false,
            type: Array,
        },
    },
    watch: {
        localValue(value) {
            // Emit value changes to the parent (form)
            this.$emit('input', value)
        },
    },
}