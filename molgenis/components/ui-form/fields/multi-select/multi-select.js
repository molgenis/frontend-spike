import vSelect from 'vue-select'
import VueForm from 'vue-form'


export default {
    components: {
        vSelect,
    },
    created() {
        // Fetch an initial list of options
        this.field.options(this.value).then(response => {
            this.options = response
            // Replace localValue with the entire object so vue-select can use the label property
            // Filter the list of the options based on the actual selected IDs
            // a like query can return more then just your IDs
            if (this.value.length > 0) {
                this.localValue = this.options.filter(option => this.value.includes(option.id))
            }
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
        addOptionClicked(event) {
            this.eventBus.$emit('addOption', this.afterOptionCreation, event, this.field)
        },
        afterOptionCreation(newOption) {
            this.options = this.options.concat(newOption)
            this.localValue = this.localValue.concat(newOption)
        },
        fetchOptions(search, loading) {
            loading(true)
            this.field.options(search).then(response => {
                this.options = response
                loading(false)
            })
        },
    },
    mixins: [VueForm],
    props: {
        allowAddingOptions: {
            default: false,
            required: false,
            type: Boolean,
        },
        eventBus: {
            required: true,
            type: Object,
        },
        field: {
            required: true,
            type: FormField,
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
        noOptionsMessage: {
            required: false,
            type: String,
        },
        value: {
            default: () => [],
            required: false,
            type: Array,
        },
    },
    watch: {
        localValue(newValues) {
            this.fieldState.$dirty = true
            this.fieldState.$pristine = false
            this.fieldState.$touched = true
            this.fieldState.$untouched = false
            // Emit value changes to the parent (form)
            this.$emit('input', newValues.map(value => value.id))
            this.$emit('focus')
            this.$emit('blur')
        },
    },
}