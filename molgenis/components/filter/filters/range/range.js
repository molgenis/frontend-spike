import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import VueSlider from 'vue-slider-component'


library.add(faTimes)

export default {
    components: { VueSlider },
    data: function() {
        return {
            rangeValue: this.value,
        }
    },
    methods: {
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
        setRangeValue(id, value) {
            this.rangeValue[id] = value
            this.handleRangeValueChange()
        },
    },
    name: 'RangeFilter',
    props: {
        max: {
            default: () => Number.MAX_SAFE_INTEGER,
            type: Number,
        },
        min: {
            default: () => Number.MIN_SAFE_INTEGER,
            type: Number,
        },
        name: {
            required: true,
            type: String,
        },
        step: {
            default: () => 1,
            type: Number,
        },
        useSlider: {
            default: () => false,
            type: Boolean,
        },
        value: {
            default: () => [null, null],
            type: Array,
        },
    },
    watch: {
        value(newValue) {
            if (newValue[0] == null && newValue[1] == null) {
                this.rangeValue = [null, null]
            }
        },
    },
}