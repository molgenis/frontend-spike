import Vue from 'vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default Vue.extend({
    components: { VueSlider },
    name: 'NumberFilter',
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
            type: Number,
            default: () => null,
        },
        useSlider: {
            type: Boolean,
            default: () => false,
        },
    },
    computed: {
        model: {
            get() {
                return this.value
            },
            set(value) {
                if (typeof value === 'string' && value === '') {
                    this.$emit('input', undefined)
                } else {
                    value = Math.min(Math.max(value, this.min), this.max)
                    this.$emit('input', parseFloat(value))
                }
            },
        },
    },
})