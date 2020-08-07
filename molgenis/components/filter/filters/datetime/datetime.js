import DateRangePicker from 'vue2-daterange-picker'
// import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import Vue from 'vue'


library.add(faTimes)

const emptyDateRange = {
    endDate: null,
    startDate: null,
}

export default Vue.extend({
    components: { DateRangePicker, FontAwesomeIcon },
    computed: {
        formattedDate: function() {
            const date = this.dateRange
            if (!date.startDate || !date.endDate) return 'Select...'
            if (date.startDate.toISOString() === date.endDate.toISOString()) {
                return date.startDate.toLocaleString()
            } else {
                return `${date.startDate.toLocaleString()} - ${date.endDate.toLocaleString()}`
            }
        },
    },
    data: function() {
        return {
            dateRange: {
                endDate: this.value.endDate,
                startDate: this.value.startDate,
            },
        }
    },
    methods: {
        clearValue: function() {
            this.dateRange = emptyDateRange
            this.$emit('input', undefined)
        },
        updateValues: function() {
            this.$emit('input', this.dateRange)
        },
    },
    name: 'DateTimeFilter',
    props: {
        max: {
            default: () => null,
            type: [String, null],
        },
        min: {
            default: () => null,
            type: [String, null],
        },
        name: {
            required: true,
            type: String,
        },
        opens: {
            default: () => 'right',
            type: String,
        },
        range: {
            default: () => true,
            type: Boolean,
        },
        time: {
            default: () => true,
            type: Boolean,
        },
        value: {
            default: () => {
                return emptyDateRange
            },
            type: Object,
        },
    },
    watch: {
        value(newValue) {
            this.dateRange = newValue
        },
    },
})