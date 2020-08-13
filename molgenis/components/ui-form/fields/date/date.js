import flatPickr from 'vue-flatpickr-component'
import { library } from '@fortawesome/fontawesome-svg-core'
import moment from 'moment'
import VueForm from 'vue-form'
import { faCalendar, faTimes } from '@fortawesome/free-solid-svg-icons'


library.add(faCalendar, faTimes)

const flatpickerLangMap = {}

// import { Dutch } from 'flatpickr/dist/l10n/nl.js'
// import { French } from 'flatpickr/dist/l10n/fr.js'
// import { German } from 'flatpickr/dist/l10n/de.js'
// import { Italian } from 'flatpickr/dist/l10n/it.js'
// import { Portuguese } from 'flatpickr/dist/l10n/pt.js'
// import { Spanish } from 'flatpickr/dist/l10n/es.js'

// const flatpickerLangMap = {
//     de: German,
//     es: Spanish,
//     fr: French,
//     it: Italian,
//     nl: Dutch,
//     pt: Portuguese,
// }

const DATE_TIME_DISPLAY = 'Y-MM-DD\\THH:mm:ssZ'

export default {
    components: {
        flatPickr,
    },
    created() {
        if (flatpickerLangMap[this.$lng]) {
            this.config.locale = flatpickerLangMap[this.$lng]
        }
    },
    data() {
        return {

            config: {
                allowInput: true,
                dateFormat: 'Y-m-d',
                enableSeconds: this.isTimeIncluded,
                enableTime: this.isTimeIncluded,
                formatDate: this.isTimeIncluded ? this.toExternalDateString : undefined,
                wrap: true,
            },
            localValue: null,
        }
    },
    methods: {
        clearValue() {
            this.localValue = null
        },
        isValidDateTime(dateString) {
            if (dateString === null || dateString === undefined) {
                return true
            }

            const format = this.isTimeIncluded ? DATE_TIME_DISPLAY : 'YYYY-MM-DD'
            const date = moment(dateString, format, true)
            return date != null && date.isValid()
        },
        toExternalDateString(internalDate) {
            return internalDate && this.isTimeIncluded ? moment(internalDate).format(DATE_TIME_DISPLAY) : internalDate
        },
        toInternalDate(propValue) {
            // Note: 'null' is the correct flatpicker no value value
            if (!propValue) {
                return null
            } else if (this.isTimeIncluded) {
                const parsedValue = moment(propValue, moment.ISO_8601, true)
                return parsedValue != null && parsedValue.isValid() ? parsedValue.toDate() : null
            } else {
                return propValue
            }
        },
    },
    mixins: [VueForm],
    props: {
        field: {
            required: true,
            type: Object,
        },
        fieldState: {
            required: false,
            type: Object,
        },
        isRequired: {
            default: false,
            type: Boolean,
        },
        isTimeIncluded: {
            default: false,
            required: false,
            type: Boolean,
        },
        isValid: {
            default: true,
            type: Boolean,
        },
        value: {
            required: false,
            type: [String, Date],
        },
    },
    watch: {
        localValue(newValue, oldValue) {
            if (newValue !== oldValue && this.isValidDateTime(newValue)) {
                this.$emit('input', this.toExternalDateString(newValue))
            }
        },
        value: {
            handler: function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    this.localValue = this.toInternalDate(newValue)
                }
            },
            immediate: true,
        },
    },
}