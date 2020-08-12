import VueForm from 'vue-form'

const MIN_JAVA_INT = -2147483648
const MAX_JAVA_INT = 2147483647

let debounceTime = 500

export default {
    computed: {
        inputType() {
            return this.isNumberField ? 'number' : this.field.type
        },
        isNumberField() {
            return this.field.type === 'integer' || this.field.type === 'long' || this.field.type === 'decimal'
        },
        isValidInt() {
            if (this.field.type !== 'integer' || this.localValue === '') {
                return true
            }

            const numberValue = Number(this.localValue)
            if (Number.isNaN(this.localValue)) {
                return false
            }
            return Number.isSafeInteger(numberValue) && numberValue <= MAX_JAVA_INT && numberValue >= MIN_JAVA_INT
        },
        isValidLong() {
            if (this.field.type !== 'long' || this.localValue === '') {
                return true
            }
            const numberValue = Number(this.localValue)
            if (Number.isNaN(this.localValue)) {
                return false
            }
            return Number.isInteger(numberValue)
        },
        max() {
            if (this.field.range && this.field.range.hasOwnProperty('max')) {
                return this.field.range.max
            }
            if (this.field.type === 'integer') {
                return MAX_JAVA_INT
            }
            if (this.field.type === 'long') {
                return Number.MAX_SAFE_INTEGER
            }
            return null
        },
        maxlength() {
            switch (this.field.type) {
            case 'text':
            case 'url':
            case 'email':
                return 255
            default:
                return null
            }
        },
        min() {
            if (this.field.range && this.field.range.hasOwnProperty('min')) {
                return this.field.range.min
            }
            if (this.field.type === 'integer') {
                return MIN_JAVA_INT
            }
            if (this.field.type === 'long') {
                return Number.MIN_SAFE_INTEGER
            }
            return null
        },

        stepSize() {
            return (this.field.type === 'integer' || this.field.type === 'long') ? 1 : 1e-10
        },
        wasValidated() {
            return this.fieldState && (this.fieldState.$touched || this.fieldState.$submitted || this.fieldState.$dirty)
        },
    },
    data() {
        return {
            // Store a local value to prevent changing the parent state
            localValue: this.value,
        }
    },
    methods: {
        toNumber(input) {
            return input !== '' ? Number(input) : null
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
        inputDebounceTime: {
            default: debounceTime,
            type: Number,
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
            // The value representing a Number or String
            required: false,
            type: [String, Number],
        },
    },
    watch: {
        localValue(value) {
            let typedValue = this.isNumberField && !Number.isNaN(Number(value)) ? this.toNumber(value)
                : value

            this.$emit('input', typedValue)
        },
    },
}