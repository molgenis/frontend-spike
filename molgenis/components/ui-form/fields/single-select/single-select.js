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
            if (this.value) {
                // Replace localValue with the entire object so vue-select can use the label property
                this.localValue = this.options.find(option => option.id === this.value)
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
            this.options.push(newOption)
            this.localValue = newOption
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
        noOptionsMessage: {
            required: false,
            type: String,
        },
        value: {
            // ID of select field can be of type: Integer, Long, String etc.
            required: false,
            type: [String, Number],
        },
    },
    watch: {
        localValue(value) {
            this.fieldState.$dirty = true
            this.fieldState.$pristine = false
            this.fieldState.$touched = true
            this.fieldState.$untouched = false
            // Emit value changes to the parent (form)
            this.$emit('input', value ? value.id : null)
            this.$emit('focus')
            this.$emit('blur')
        },
    },
}