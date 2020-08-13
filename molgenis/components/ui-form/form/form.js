import { isValidSchema } from '/molgenis/lib/service/schema.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import Vue from 'vue'
import VueForm from 'vue-form'
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'


library.add(faEye, faEyeSlash)

export default {
    computed: {
        eyeMessage() {
            const defaultMessages = (key) => {
                return {
                    'ui-form:form_hide_optional_hint': 'Hide optional fields',
                    'ui-form:form_show_optional_hint': 'Show all fields',
                }[key]
            }
            const localizedMessages = this.$t || defaultMessages
            return this.showOptionalFields ? localizedMessages('ui-form:form_hide_optional_hint') : localizedMessages('ui-form:form_show_optional_hint')
        },
        formData() {
            return Object.assign({}, this.initialFormData)
        },
    },
    created: function() {
        this.eventBus.$on('addOption', this.handleAddOptionEvent)
    },
    data() {
        return {
            eventBus: new Vue(),
            showOptionalFields: true,
        }
    },
    methods: {
        handleAddOptionEvent(completedFunction, event, data) {
            this.$emit('addOptionRequest', completedFunction, event, data)
        },
        handleValueChange(formData) {
            this.$emit('valueChange', formData)
        },
        toggleOptionalFields() {
            this.showOptionalFields = !this.showOptionalFields
        },
    },
    mixins: [VueForm],
    props: {
        formFields: {
            required: true,
            type: Array,
            validator: isValidSchema,
        },
        formState: {
            default: () => ({}),
            required: false,
            type: Object,
        },
        id: {
            required: true,
            type: String,
        },
        initialFormData: {
            required: true,
            type: Object,
        },
        options: {
            default: () => {
                return {
                    showEyeButton: true,
                }
            },
            required: false,
            type: Object,
        },
    },
}