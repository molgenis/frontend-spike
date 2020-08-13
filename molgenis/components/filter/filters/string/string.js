
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'


library.add(faTimes)

export default {
    computed: {
        model: {
            get() {
                return this.value || ''
            },
            set(value) {
                this.$emit('input', value === '' ? undefined : value)
            },
        },
    },
    props: {
        name: {
            required: true,
            type: String,
        },
        placeholder: {
            default: () => '',
            required: false,
            type: String,
        },
        value: {
            default: () => '',
            type: String,
        },
    },
}