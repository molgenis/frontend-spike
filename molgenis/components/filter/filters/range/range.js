import Vue from 'vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTimes)

export default Vue.extend({
    name: 'RangeFilter',
    components: { VueSlider, FontAwesomeIcon },
    props: {
        name: {
            type: String,
            required: true,
        },
        min: {
            type: Number,
            default: () => Number.MIN_SAFE_INTEGER,
        },
        max: {
            type: Number,
            default: () => Number.MAX_SAFE_INTEGER,
        },
        step: {
            type: Number,
            default: () => 1,
        },
        value: {
            type: Array,
            default: () => [null, null],
        },
        useSlider: {
            type: Boolean,
            default: () => false,
        },
    },
    data: function() {
        return {
            rangeValue: this.value,
        }
    },
    watch: {
        value(newValue) {
            if (newValue[0] == null && newValue[1] == null) {
                this.rangeValue = [null, null]
            }
        },
    },
    methods: {
        setRangeValue(id, value) {
            this.rangeValue[id] = value
            this.handleRangeValueChange()
        },
        clampValue(value, max, min) {
            return Math.min(Math.max(value, min), max)
        },
        handleRangeValueChange() {
            if (this.rangeValue[0] != null) {
                this.rangeValue[0] = this.clampValue(this.rangeValue[0], this.max, this.min)
            }
            if (this.rangeValue[1] != null) {
                this.rangeValue[1] = this.clampValue(this.rangeValue[1], this.max, this.min)
            }
            this.rangeValue = [this.rangeValue[0], this.rangeValue[1]]

            // clone to break reactive loop
            this.$emit('input', [...this.rangeValue])
        },
    },
})