
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'


library.add(faTimes)

export default {
    components: { FontAwesomeIcon },
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
    name: 'StringFilter',
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