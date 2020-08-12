import VueSlider from 'vue-slider-component'
// import 'vue-slider-component/theme/default.css'

export default {
    components: { VueSlider },
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
    name: 'NumberFilter',
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
            default: () => null,
            type: Number,
        },
    },
}