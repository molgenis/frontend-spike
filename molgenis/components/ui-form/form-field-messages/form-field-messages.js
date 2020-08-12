import VueForm from 'vue-form'

const defaultMessages = {
    'ui-form:form_above_max_value': 'Value is above allowed value',
    'ui-form:form_below_min_value': 'Value is below allowed value',
    'ui-form:form_maxlength_exceeded': 'Maximum length is',
    'ui-form:form_not_a_valid_email': 'Not a valid email',
    'ui-form:form_not_a_valid_integer': 'Not a valid integer value',
    'ui-form:form_not_a_valid_long': 'Not a valid long value',
    'ui-form:form_not_a_valid_number': 'Not a valid number',
    'ui-form:form_not_a_valid_url': 'Not a valid URL',
    'ui-form:form_not_unique': 'Not a unique value',
    'ui-form:form_not_within_range': 'Value is outside of range',
    'ui-form:form_required_field': 'This field is required',
    'ui-form:form_validation_failed': 'Validation failed',
}

export default {
    computed: {
        maxMessage() {
            return this.min !== null ? this.minMaxMessage : `${this.aboveMaxValueMsg} ${this.max}`
        },
        minMaxMessage() {
            return `${this.notWithInRangeMsg} (${this.min} - ${this.max})`
        },
        minMessage() {
            return this.max !== null ? this.minMaxMessage : `${this.belowMinValueMsg} ${this.min}`
        },
    },
    created() {
        this.localizedMessages = this.$t || this.getDefaultMessage

        this.requiredFieldMsg = this.getLocalizedMessage('ui-form:form_required_field')
        this.validationFailedMsg = this.getLocalizedMessage('ui-form:form_validation_failed')
        this.notUniqueMsg = this.getLocalizedMessage('ui-form:form_not_unique')
        this.notAValidNumberMsg = this.getLocalizedMessage('ui-form:form_not_a_valid_number')
        this.notAValidIntegerMsg = this.getLocalizedMessage('ui-form:form_not_a_valid_integer')
        this.notAValidLongMsg = this.getLocalizedMessage('ui-form:form_not_a_valid_long')
        this.notAValidUrlMsg = this.getLocalizedMessage('ui-form:form_not_a_valid_url')
        this.notAValidEmailMsg = this.getLocalizedMessage('ui-form:form_not_a_valid_email')

        this.notWithInRangeMsg = this.getLocalizedMessage('ui-form:form_not_within_range')
        this.belowMinValueMsg = this.getLocalizedMessage('ui-form:form_below_min_value')
        this.aboveMaxValueMsg = this.getLocalizedMessage('ui-form:form_above_max_value')
        this.maxlengthMsg = this.getLocalizedMessage('ui-form:form_maxlength_exceeded')
    },
    data() {
        return {
            localizedMessages: {},
        }
    },
    methods: {
        getDefaultMessage(msgKey) {
            return defaultMessages[msgKey]
        },
        getLocalizedMessage(msgKey) {
            return this.localizedMessages(msgKey)
        },
    },
    mixins: [VueForm],
    props: {
        fieldId: {
            required: true,
            type: [String, Number],
        },
        fieldState: {
            type: Object,
        },
        max: {
            default: null,
            required: false,
            type: Number,
        },
        maxlength: {
            default: null,
            required: false,
            type: Number,
        },
        min: {
            default: null,
            required: false,
            type: Number,
        },
    },
}