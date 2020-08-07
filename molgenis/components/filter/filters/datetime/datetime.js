import Vue from 'vue'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTimes)

const emptyDateRange = {
    startDate: null,
    endDate: null,
}

export default Vue.extend({
    name: 'DateTimeFilter',
    components: { DateRangePicker, FontAwesomeIcon },
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
            type: String,
            required: true,
        },
        opens: {
            default: () => 'right',
            type: String,
        },
        time: {
            type: Boolean,
            default: () => true,
        },
        range: {
            type: Boolean,
            default: () => true,
        },
        value: {
            type: Object,
            default: () => {
                return emptyDateRange
            },
        },
    },
    data: function() {
        return {
            dateRange: {
                startDate: this.value.startDate,
                endDate: this.value.endDate,
            },
        }
    },
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
    watch: {
        value(newValue) {
            this.dateRange = newValue
        },
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
})